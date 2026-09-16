import fs from 'fs';

class Environment {
    constructor(parent = null) {
        this.values = new Map();
        this.parent = parent;
    }

    define(name, value) {
        this.values.set(name, value);
    }

    get(name) {
        if (this.values.has(name)) {
            return this.values.get(name);
        }
        if (this.parent !== null) {
            return this.parent.get(name);
        }
        throw new Error(`Undefined variable '${name}'`);
    }

    assign(name, value) {
        if (this.values.has(name)) {
            this.values.set(name, value);
            return;
        }
        if (this.parent !== null) {
            this.parent.assign(name, value);
            return;
        }
        throw new Error(`Undefined variable '${name}' for assignment`);
    }
}

class ReturnException {
    constructor(value) {
        this.value = value;
    }
}

class Runtime {
    constructor() {
        this.globalEnv = new Environment();
    }

    interpret(node, env = this.globalEnv) {
        switch (node.type) {
            case 'Program': {
                let result;
                for (const stmt of node.body) {
                    result = this.interpret(stmt, env);
                }
                return result;
            }
            case 'LetStatement': {
                const val = this.interpret(node.init, env);
                env.define(node.name, val);
                return val;
            }
            case 'AssignmentStatement': {
                const val = this.interpret(node.value, env);
                if (node.target.type === 'Identifier') {
                    env.assign(node.target.name, val);
                } else if (node.target.type === 'MemberExpression') {
                    const obj = this.interpret(node.target.object, env);
                    if (obj === null || (typeof obj !== 'object' && !Array.isArray(obj))) {
                        throw new Error(`Cannot assign property on non-object/non-array`);
                    }
                    let propKey;
                    if (node.target.computed) {
                        propKey = this.interpret(node.target.property, env);
                    } else {
                        propKey = node.target.property;
                    }
                    obj[propKey] = val;
                } else {
                    throw new Error(`Invalid assignment target`);
                }
                return val;
            }
            case 'SayStatement': {
                const val = this.interpret(node.expression, env);
                console.log(this.formatOutput(val));
                return val;
            }
            case 'AskStatement': {
                let promptStr = '';
                if (node.prompt) {
                    promptStr = this.formatOutput(this.interpret(node.prompt, env));
                }
                const buffer = Buffer.alloc(1024);
                process.stdout.write(promptStr);
                let bytesRead = 0;
                try {
                    bytesRead = fs.readSync(0, buffer, 0, 1024, null);
                } catch (e) {
                    bytesRead = 0;
                }
                const input = buffer.toString('utf8', 0, bytesRead).trim();
                return input;
            }
            case 'IfStatement': {
                const cond = this.interpret(node.condition, env);
                if (this.isTruthy(cond)) {
                    let res;
                    const blockEnv = new Environment(env);
                    for (const stmt of node.consequent) {
                        res = this.interpret(stmt, blockEnv);
                    }
                    return res;
                } else if (node.alternate) {
                    let res;
                    const blockEnv = new Environment(env);
                    for (const stmt of node.alternate) {
                        res = this.interpret(stmt, blockEnv);
                    }
                    return res;
                }
                return null;
            }
            case 'RepeatStatement': {
                const countVal = this.interpret(node.count, env);
                const count = Number(countVal);
                let res = null;
                for (let i = 0; i < count; i++) {
                    const blockEnv = new Environment(env);
                    for (const stmt of node.body) {
                        res = this.interpret(stmt, blockEnv);
                    }
                }
                return res;
            }
            case 'EachStatement': {
                const collection = this.interpret(node.collection, env);
                let res = null;
                if (!Array.isArray(collection)) {
                    throw new Error(`Collection in 'each' must be an array`);
                }
                for (const item of collection) {
                    const blockEnv = new Environment(env);
                    blockEnv.define(node.variable, item);
                    for (const stmt of node.body) {
                        res = this.interpret(stmt, blockEnv);
                    }
                }
                return res;
            }
            case 'MakeStatement': {
                const func = {
                    type: 'Function',
                    params: node.params,
                    body: node.body,
                    closure: env
                };
                env.define(node.name, func);
                return func;
            }
            case 'GiveStatement': {
                const val = this.interpret(node.expression, env);
                throw new ReturnException(val);
            }
            case 'ExpressionStatement': {
                return this.interpret(node.expression, env);
            }
            case 'BinaryExpression': {
                const left = this.interpret(node.left, env);
                const right = this.interpret(node.right, env);
                return this.evalBinaryExpression(node.operator, left, right);
            }
            case 'CallExpression': {
                const callee = this.interpret(node.callee, env);
                const args = node.arguments.map(arg => this.interpret(arg, env));
                if (typeof callee === 'function') {
                    return callee(...args);
                }
                if (callee && callee.type === 'Function') {
                    const funcEnv = new Environment(callee.closure);
                    for (let i = 0; i < callee.params.length; i++) {
                        funcEnv.define(callee.params[i], args[i]);
                    }
                    try {
                        for (const stmt of callee.body) {
                            this.interpret(stmt, funcEnv);
                        }
                    } catch (e) {
                        if (e instanceof ReturnException) {
                            return e.value;
                        }
                        throw e;
                    }
                    return null;
                }
                throw new Error(`Callee is not a function`);
            }
            case 'MemberExpression': {
                const obj = this.interpret(node.object, env);
                if (obj === null || obj === undefined) {
                    throw new Error(`Cannot read property of null or undefined`);
                }
                let prop;
                if (node.computed) {
                    prop = this.interpret(node.property, env);
                } else {
                    prop = node.property;
                }
                return obj[prop];
            }
            case 'ArrayLiteral': {
                return node.elements.map(el => this.interpret(el, env));
            }
            case 'ObjectLiteral': {
                const obj = {};
                for (const prop of node.properties) {
                    obj[prop.key] = this.interpret(prop.value, env);
                }
                return obj;
            }
            case 'Literal': {
                return node.value;
            }
            case 'Identifier': {
                return env.get(node.name);
            }
            default:
                throw new Error(`Unknown AST node type: ${node.type}`);
        }
    }

    evalBinaryExpression(op, left, right) {
        switch (op) {
            case '+': return left + right;
            case '-': return left - right;
            case '*': return left * right;
            case '/': 
                if (right === 0) throw new Error(`Division by zero`);
                return left / right;
            case '==': return left === right;
            case '!=': return left !== right;
            case '<': return left < right;
            case '<=': return left <= right;
            case '>': return left > right;
            case '>=': return left >= right;
            case 'and':
            case '&&': return this.isTruthy(left) && this.isTruthy(right);
            case 'or':
            case '||': return this.isTruthy(left) || this.isTruthy(right);
            default: throw new Error(`Unknown binary operator '${op}'`);
        }
    }

    isTruthy(val) {
        if (val === false || val === null || val === undefined || val === 0 || val === '') return false;
        return true;
    }

    formatOutput(val) {
        if (val === null || val === undefined) return 'nil';
        if (typeof val === 'object') return JSON.stringify(val);
        return String(val);
    }
}

export default Runtime;

