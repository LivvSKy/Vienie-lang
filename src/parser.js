class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.pos = 0;
        this.currentToken = this.tokens[this.pos] || null;
    }

    advance() {
        this.pos++;
        this.currentToken = this.tokens[this.pos] || null;
    }

    peek() {
        const nextPos = this.pos + 1;
        return nextPos < this.tokens.length ? this.tokens[nextPos] : null;
    }

    expect(type) {
        if (this.currentToken.type === type) {
            const token = this.currentToken;
            this.advance();
            return token;
        }
        throw new Error(`Expected token type ${type}, but got ${this.currentToken.type} ('${this.currentToken.value}') at line ${this.currentToken.line}, col ${this.currentToken.col} in ${this.currentToken.filename}`);
    }

    parse() {
        const statements = [];
        while (this.currentToken !== null && this.currentToken.type !== 'EOF') {
            statements.push(this.statement());
        }
        return {
            type: 'Program',
            body: statements
        };
    }

    statement() {
        if (this.currentToken.type === 'LET') {
            return this.parseLetStatement();
        }
        if (this.currentToken.type === 'SAY') {
            return this.parseSayStatement();
        }
        if (this.currentToken.type === 'IF') {
            return this.parseIfStatement();
        }
        if (this.currentToken.type === 'REPEAT') {
            return this.parseRepeatStatement();
        }
        if (this.currentToken.type === 'EACH') {
            return this.parseEachStatement();
        }
        if (this.currentToken.type === 'MAKE') {
            return this.parseMakeStatement();
        }
        if (this.currentToken.type === 'GIVE') {
            return this.parseGiveStatement();
        }

        const expr = this.expression();
        if (this.currentToken && this.currentToken.type === 'ASSIGN') {
            this.advance();
            const value = this.expression();
            return {
                type: 'AssignmentStatement',
                target: expr,
                value
            };
        }

        return {
            type: 'ExpressionStatement',
            expression: expr
        };
    }

    parseLetStatement() {
        const letToken = this.currentToken;
        this.advance();
        const identifier = this.expect('IDENTIFIER');
        this.expect('ASSIGN');
        const init = this.expression();
        return {
            type: 'LetStatement',
            name: identifier.value,
            init,
            line: letToken.line,
            col: letToken.col
        };
    }

    parseSayStatement() {
        const sayToken = this.currentToken;
        this.advance();
        const expr = this.expression();
        return {
            type: 'SayStatement',
            expression: expr,
            line: sayToken.line,
            col: sayToken.col
        };
    }

    parseIfStatement() {
        const ifToken = this.currentToken;
        this.advance();
        const condition = this.expression();
        this.expect('LBRACE');
        const consequent = [];
        while (this.currentToken && this.currentToken.type !== 'RBRACE' && this.currentToken.type !== 'EOF') {
            consequent.push(this.statement());
        }
        this.expect('RBRACE');

        let alternate = null;
        if (this.currentToken && this.currentToken.type === 'OTHERWISE') {
            this.advance();
            this.expect('LBRACE');
            alternate = [];
            while (this.currentToken && this.currentToken.type !== 'RBRACE' && this.currentToken.type !== 'EOF') {
                alternate.push(this.statement());
            }
            this.expect('RBRACE');
        }

        return {
            type: 'IfStatement',
            condition,
            consequent,
            alternate,
            line: ifToken.line,
            col: ifToken.col
        };
    }

    parseRepeatStatement() {
        const repeatToken = this.currentToken;
        this.advance();
        const count = this.expression();
        this.expect('LBRACE');
        const body = [];
        while (this.currentToken && this.currentToken.type !== 'RBRACE' && this.currentToken.type !== 'EOF') {
            body.push(this.statement());
        }
        this.expect('RBRACE');

        return {
            type: 'RepeatStatement',
            count,
            body,
            line: repeatToken.line,
            col: repeatToken.col
        };
    }

    parseEachStatement() {
        const eachToken = this.currentToken;
        this.advance();
        const variable = this.expect('IDENTIFIER').value;
        if (this.currentToken.type !== 'IN') {
            throw new Error(`Expected 'in' after variable in each statement at line ${this.currentToken.line}`);
        }
        this.advance();
        const collection = this.expression();
        this.expect('LBRACE');
        const body = [];
        while (this.currentToken && this.currentToken.type !== 'RBRACE' && this.currentToken.type !== 'EOF') {
            body.push(this.statement());
        }
        this.expect('RBRACE');

        return {
            type: 'EachStatement',
            variable,
            collection,
            body,
            line: eachToken.line,
            col: eachToken.col
        };
    }

    parseMakeStatement() {
        const makeToken = this.currentToken;
        this.advance();
        const name = this.expect('IDENTIFIER').value;
        this.expect('LPAREN');
        const params = [];
        if (this.currentToken && this.currentToken.type !== 'RPAREN') {
            params.push(this.expect('IDENTIFIER').value);
            while (this.currentToken && this.currentToken.type === 'COMMA') {
                this.advance();
                params.push(this.expect('IDENTIFIER').value);
            }
        }
        this.expect('RPAREN');
        this.expect('LBRACE');
        const body = [];
        while (this.currentToken && this.currentToken.type !== 'RBRACE' && this.currentToken.type !== 'EOF') {
            body.push(this.statement());
        }
        this.expect('RBRACE');

        return {
            type: 'MakeStatement',
            name,
            params,
            body,
            line: makeToken.line,
            col: makeToken.col
        };
    }

    parseGiveStatement() {
        const giveToken = this.currentToken;
        this.advance();
        const expr = this.expression();
        return {
            type: 'GiveStatement',
            expression: expr,
            line: giveToken.line,
            col: giveToken.col
        };
    }

    expression() {
        return this.parseLogicalOr();
    }

    parseLogicalOr() {
        let node = this.parseEquality();
        while (this.currentToken && this.currentToken.type === 'OR') {
            const operator = this.currentToken.value;
            this.advance();
            node = {
                type: 'BinaryExpression',
                operator,
                left: node,
                right: this.parseEquality()
            };
        }
        return node;
    }

    parseEquality() {
        let node = this.parseComparison();
        while (this.currentToken && (this.currentToken.type === 'EQ' || this.currentToken.type === 'NEQ')) {
            const operator = this.currentToken.value;
            this.advance();
            node = {
                type: 'BinaryExpression',
                operator,
                left: node,
                right: this.parseComparison()
            };
        }
        return node;
    }

    parseComparison() {
        let node = this.parseAdditive();
        while (this.currentToken && ['LT', 'GT', 'LTE', 'GTE'].includes(this.currentToken.type)) {
            const operator = this.currentToken.value;
            this.advance();
            node = {
                type: 'BinaryExpression',
                operator,
                left: node,
                right: this.parseAdditive()
            };
        }
        return node;
    }

    parseAdditive() {
        let node = this.parseMultiplicative();
        while (this.currentToken && (this.currentToken.type === 'PLUS' || this.currentToken.type === 'MINUS')) {
            const operator = this.currentToken.value;
            this.advance();
            node = {
                type: 'BinaryExpression',
                operator,
                left: node,
                right: this.parseMultiplicative()
            };
        }
        return node;
    }

    parseMultiplicative() {
        let node = this.parsePostfix();
        while (this.currentToken && (this.currentToken.type === 'MULTIPLY' || this.currentToken.type === 'DIVIDE')) {
            const operator = this.currentToken.value;
            this.advance();
            node = {
                type: 'BinaryExpression',
                operator,
                left: node,
                right: this.parsePostfix()
            };
        }
        return node;
    }

    parsePostfix() {
        let node = this.parsePrimary();

        while (this.currentToken) {
            if (this.currentToken.type === 'LPAREN') {
                this.advance();
                const args = [];
                if (this.currentToken && this.currentToken.type !== 'RPAREN') {
                    args.push(this.expression());
                    while (this.currentToken && this.currentToken.type === 'COMMA') {
                        this.advance();
                        args.push(this.expression());
                    }
                }
                this.expect('RPAREN');
                node = {
                    type: 'CallExpression',
                    callee: node,
                    arguments: args
                };
            } else if (this.currentToken.type === 'DOT') {
                this.advance();
                const property = this.expect('IDENTIFIER').value;
                node = {
                    type: 'MemberExpression',
                    object: node,
                    property,
                    computed: false
                };
            } else if (this.currentToken.type === 'LBRACKET') {
                this.advance();
                const index = this.expression();
                this.expect('RBRACKET');
                node = {
                    type: 'MemberExpression',
                    object: node,
                    property: index,
                    computed: true
                };
            } else {
                break;
            }
        }

        return node;
    }

    parsePrimary() {
        const token = this.currentToken;

        if (token.type === 'ASK') {
            const askToken = this.currentToken;
            this.advance();
            let promptExpr = null;
            if (this.currentToken && this.currentToken.type !== 'EOF' && this.currentToken.type !== 'RBRACE' && this.currentToken.type !== 'RPAREN' && this.currentToken.type !== 'COMMA') {
                promptExpr = this.expression();
            }
            return {
                type: 'AskStatement',
                prompt: promptExpr,
                line: askToken.line,
                col: askToken.col
            };
        }
        if (token.type === 'NUMBER') {
            this.advance();
            return { type: 'Literal', value: token.value };
        }
        if (token.type === 'STRING') {
            this.advance();
            return { type: 'Literal', value: token.value };
        }
        if (token.type === 'TRUE') {
            this.advance();
            return { type: 'Literal', value: true };
        }
        if (token.type === 'FALSE') {
            this.advance();
            return { type: 'Literal', value: false };
        }
        if (token.type === 'IDENTIFIER') {
            this.advance();
            return { type: 'Identifier', name: token.value };
        }
        if (token.type === 'LBRACKET') {
            this.advance();
            const elements = [];
            if (this.currentToken && this.currentToken.type !== 'RBRACKET') {
                elements.push(this.expression());
                while (this.currentToken && this.currentToken.type === 'COMMA') {
                    this.advance();
                    elements.push(this.expression());
                }
            }
            this.expect('RBRACKET');
            return { type: 'ArrayLiteral', elements };
        }
        if (token.type === 'LBRACE') {
            this.advance();
            const properties = [];
            if (this.currentToken && this.currentToken.type !== 'RBRACE') {
                while (true) {
                    const keyToken = this.expect('IDENTIFIER');
                    if (this.currentToken.type === 'COLON' || this.currentToken.type === 'ASSIGN') {
                        this.advance();
                    } else {
                        throw new Error(`Expected ':' or '=' in object literal at line ${this.currentToken.line}`);
                    }
                    const val = this.expression();
                    properties.push({ key: keyToken.value, value: val });
                    if (this.currentToken.type === 'COMMA') {
                        this.advance();
                    } else {
                        break;
                    }
                }
            }
            this.expect('RBRACE');
            return { type: 'ObjectLiteral', properties };
        }
        if (token.type === 'LPAREN') {
            this.advance();
            const expr = this.expression();
            this.expect('RPAREN');
            return expr;
        }

        throw new Error(`Unexpected token ${token.type} ('${token.value}') at line ${token.line}, col ${token.col} in ${token.filename}`);
    }
}

export default Parser;

