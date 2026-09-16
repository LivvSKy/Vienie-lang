# Veyra 0.2.0

Veyra is an original programming language with its own lexer, parser, AST and runtime.

## Run

```bash
node bin/veyra.js examples/v02.vey
```

## REPL

```bash
node bin/veyra.js repl
```

## Syntax highlighting

The `editors/vscode` directory is a VS Code extension for `.vey` files. It defines native TextMate scopes for Veyra keywords, strings, numbers, functions, comments and operators.

Veyra keyword categories include `let`, `make`, `say`, `ask`, `if`, `otherwise`, `repeat`, `each`, `in`, and `give`.

## npm link

```bash
npm link
veyra examples/v02.vey
```

## Development

The interpreter does not depend on another language runtime for parsing Veyra source. JavaScript is only the implementation language of the current Veyra runtime.
