#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import os from 'os';
import readline from 'readline';
import Lexer from '../src/lexer.js';
import Parser from '../src/parser.js';
import Runtime from '../src/runtime.js';

const args = process.argv.slice(2);

function setupNano() {
    const homeDir = os.homedir();
    const nanoDir = path.join(homeDir, '.nano');
    const nanorcPath = path.join(homeDir, '.nanorc');
    const vienieNanorcPath = path.join(nanoDir, 'vienie.nanorc');

    const nanoSyntax = `syntax "vienie" "\\.vie$"
comment "//"

color magenta "\\b(let|make)\\b"
color blue "\\b(say|ask)\\b"
color yellow "\\b(if|otherwise|repeat|each|in|give)\\b"
color cyan "\\b(true|false)\\b"
color cyan "\\b[0-9]+(\\.[0-9]+)?\\b"
color yellow "[\\+\\-\\*/=><!:]"
color yellow ""([^"]|\\\\")*""
color yellow "'([^']|\\\\')*'"
color blue "\\b[a-zA-Z_][a-zA-Z0-9_]*\\s*\\("
color brightblack "//.*$"
`;

    try {
        if (!fs.existsSync(nanoDir)) {
            fs.mkdirSync(nanoDir, { recursive: true });
        }
        
        fs.writeFileSync(vienieNanorcPath, nanoSyntax, 'utf8');

        let nanorcContent = fs.existsSync(nanorcPath) ? fs.readFileSync(nanorcPath, 'utf8') : '';
        const includeLine = 'include "~/.nano/vienie.nanorc"';

        if (!nanorcContent.includes(includeLine)) {
            fs.appendFileSync(nanorcPath, `\n${includeLine}\n`, 'utf8');
        }

        console.log("✔ Nano syntax highlighting configured successfully!");
    } catch (err) {
        console.error(`[Vienie Error] Failed to set up Nano syntax: ${err.message}`);
    }
}

function setupVSCode() {
    const homeDir = os.homedir();
    const vscodeExtDir = path.join(homeDir, '.vscode', 'extensions', 'vienie-lang');
    const syntaxesDir = path.join(vscodeExtDir, 'syntaxes');

    const pkgJson = JSON.stringify({
        name: "vienie-lang",
        displayName: "Vienie Language Support",
        description: "Syntax highlighting for Vienie (.vie) files",
        version: "0.3.1",
        engines: { vscode: "^1.50.0" },
        categories: ["Programming Languages"],
        contributes: {
            languages: [{
                id: "vienie",
                aliases: ["Vienie", "vienie"],
                extensions: [".vie"],
                configuration: "./language-configuration.json"
            }],
            grammars: [{
                language: "vienie",
                scopeName: "source.vie",
                path: "./syntaxes/vienie.tmLanguage.json"
            }]
        }
    }, null, 2);

    const langConfig = JSON.stringify({
        comments: { lineComment: "//" },
        brackets: [["{", "}"], ["[", "]"], ["(", ")"]],
        autoClosingPairs: [
            { open: "{", close: "}" },
            { open: "[", close: "]" },
            { open: "(", close: ")" },
            { open: '"', close: '"' },
            { open: "'", close: "'" }
        ]
    }, null, 2);

    const tmLanguage = JSON.stringify({
        "$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
        "name": "Vienie",
        "scopeName": "source.vie",
        "patterns": [
            { "include": "#comments" },
            { "include": "#declarations" },
            { "include": "#io-builtins" },
            { "include": "#control-flow" },
            { "include": "#returns" },
            { "include": "#booleans" },
            { "include": "#numbers" },
            { "include": "#strings" },
            { "include": "#function-declarations" },
            { "include": "#function-calls" },
            { "include": "#operators" },
            { "include": "#delimiters" }
        ],
        "repository": {
            "comments": { "patterns": [{ "name": "comment.line.double-slash.vienie", "match": "//.*$" }] },
            "declarations": { "patterns": [{ "name": "keyword.declaration.vienie storage.type.vienie", "match": "\\b(let|make)\\b" }] },
            "io-builtins": { "patterns": [{ "name": "support.function.builtin.vienie", "match": "\\b(say|ask)\\b" }] },
            "control-flow": { "patterns": [{ "name": "keyword.control.conditional.vienie", "match": "\\b(if|otherwise|repeat|each|in)\\b" }] },
            "returns": { "patterns": [{ "name": "keyword.control.flow.return.vienie", "match": "\\bgive\\b" }] },
            "booleans": { "patterns": [{ "name": "constant.language.boolean.vienie", "match": "\\b(true|false)\\b" }] },
            "numbers": { "patterns": [{ "name": "constant.numeric.vienie", "match": "\\b[0-9]+(\\.[0-9]+)?\\b" }] },
            "strings": {
                "patterns": [
                    { "name": "string.quoted.double.vienie", "begin": "\"", "end": "\"", "patterns": [{ "name": "constant.character.escape.vienie", "match": "\\\\." }] },
                    { "name": "string.quoted.single.vienie", "begin": "'", "end": "'", "patterns": [{ "name": "constant.character.escape.vienie", "match": "\\\\." }] }
                ]
            },
            "function-declarations": {
                "patterns": [{
                    "match": "\\b(make)\\s+([a-zA-Z_][a-zA-Z0-9_]*)",
                    "captures": {
                        "1": { "name": "keyword.declaration.vienie" },
                        "2": { "name": "entity.name.function.vienie" }
                    }
                }]
            },
            "function-calls": {
                "patterns": [{
                    "match": "\\b([a-zA-Z_][a-zA-Z0-9_]*)\\s*(?=\\()",
                    "captures": { "1": { "name": "entity.name.function.vienie" } }
                }]
            },
            "operators": { "patterns": [{ "name": "keyword.operator.vienie", "match": "(\\+|\\-|\\*|\\/|==|!=|<=|>=|<|>|=)" }] },
            "delimiters": { "patterns": [{ "name": "punctuation.separator.vienie", "match": "(\\.|,|:)" }] }
        }
    }, null, 2);

    try {
        fs.mkdirSync(syntaxesDir, { recursive: true });
        fs.writeFileSync(path.join(vscodeExtDir, 'package.json'), pkgJson);
        fs.writeFileSync(path.join(vscodeExtDir, 'language-configuration.json'), langConfig);
        fs.writeFileSync(path.join(syntaxesDir, 'vienie.tmLanguage.json'), tmLanguage);

        console.log("✔ VS Code syntax highlighting extension installed to ~/.vscode/extensions!");
        console.log("  Restart VS Code to apply syntax highlighting.");
    } catch (err) {
        console.error(`[Vienie Error] Failed to set up VS Code extension: ${err.message}`);
    }
}

if (args.includes('--version') || args.includes('-v')) {
    console.log("Vienie v0.3.1");
    process.exit(0);
}

if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Vienie v0.3.1 - Language CLI

Usage:
  vienie <file.vie>           Run a Vienie source file
  vienie                      Launch interactive REPL

Options:
  -v, --version               Show installed Vienie version
  -h, --help                  Show command options
  --setup-nano                Install syntax highlighting for Nano editor
  --setup-vscode              Install syntax highlighting for VS Code
  --setup-hsyntax             Install syntax highlighting for all supported editors
`);
    process.exit(0);
}

if (args.includes('--setup-nano')) {
    setupNano();
    process.exit(0);
}

if (args.includes('--setup-vscode')) {
    setupVSCode();
    process.exit(0);
}

if (args.includes('--setup-hsyntax')) {
    console.log("Installing Vienie syntax highlighting across editors...\n");
    setupNano();
    setupVSCode();
    console.log("\nComplete!");
    process.exit(0);
}

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
    console.log(`Vienie v0.3.1 Interactive REPL`);
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
