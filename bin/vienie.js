#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import Lexer from '../src/lexer.js';
import Parser from '../src/parser.js';
import Runtime from '../src/runtime.js';

const args = process.argv.slice(2);

function runCode(code, filename = '<repl>') {
    try {
        const lexer = new Lexer(code, filename);
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        const runtime = new Runtime();
        return runtime.interpret(ast);
    } catch (err) {
        console.error(`[Vienie Error] ${err.message}`);
        if (filename !== '<repl>') {
            process.exit(1);
        }
    }
}

if (args.length > 0 && args[0] !== '-i' && args[0] !== '--interactive') {
    const filePath = path.resolve(process.cwd(), args[0]);
    if (!fs.existsSync(filePath)) {
        console.error(`[Vienie Error] File not found: ${filePath}`);
        process.exit(1);
    }
    const code = fs.readFileSync(filePath, 'utf8');
    runCode(code, filePath);
} else {
    console.log(`Vienie v0.3.0 Interactive REPL`);
    console.log(`Type .exit to quit.\n`);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Input > '
    });

    const runtime = new Runtime();

    rl.prompt();

    rl.on('line', (line) => {
        const trimmed = line.trim();
        if (trimmed === '.exit') {
            process.exit(0);
        }
        if (trimmed === '') {
            rl.prompt();
            return;
        }

        try {
            const lexer = new Lexer(trimmed, '<repl>');
            const tokens = lexer.tokenize();
            const parser = new Parser(tokens);
            const ast = parser.parse();
            const result = runtime.interpret(ast);
            if (result !== undefined && result !== null) {
                console.log(result);
            }
        } catch (err) {
            console.error(`[Vienie Error] ${err.message}`);
        }

        rl.prompt();
    }).on('close', () => {
        console.log('Goodbye!');
        process.exit(0);
    });
}
