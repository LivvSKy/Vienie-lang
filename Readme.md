<div align="center">

<img src="https://s4up.vercel.app/s4uP/170658-S4-1000252276.png" alt="Vienie" width="180">

# Vienie

**An original, lightweight programming language.**

English · [Bahasa Indonesia](Readme-id.md) · [Русский](Readme-ru.md) · [日本語](Readme-ja.md) · [简体中文](Readme-zh.md) · [Español](Readme-es.md)

</div>

## About

Vienie is an original programming language with its own lexer, parser, AST and runtime. Vienie source files use the `.vie` extension and the command-line interface is `vienie`.

Vienie is not a JavaScript wrapper with renamed keywords. JavaScript is used to implement the current toolchain, while Vienie has its own source syntax and language pipeline.

## Installation

```bash
npm install -g vienie
```

Run a program:

```bash
vienie program.vie
```

Start the REPL:

```bash
vienie
```

## Quick Start

```vie
let name = "Livio"

say "Hello, " + name

repeat 3 {
    say "Vienie!"
}
```

## Syntax & Usage

| Syntax | Purpose | Example |
|---|---|---|
| `let` | Create a variable | `let name = "Livio"` |
| `say` | Output a value | `say "Hello"` |
| `ask` | Request input | `ask "What is your name?"` |
| `if` | Start a condition | `if age >= 15 { ... }` |
| `otherwise` | Alternative branch | `otherwise { ... }` |
| `repeat` | Repeat a block | `repeat 3 { ... }` |
| `each` | Iterate through a collection | `each item in items { ... }` |
| `in` | Connect an iterator to a collection | `each item in items` |
| `make` | Define a function | `make add(a, b) { ... }` |
| `give` | Return a value | `give a + b` |
| `[]` | Create an array | `let scores = [10, 20, 30]` |
| `#` | Start a comment | `# comment` |

## Example

```vie
let name = "Livio"
let scores = [10, 20, 30]

say "Hello, " + name

each score in scores {
    say score
}

make add(a, b) {
    give a + b
}

say add(10, 5)
```

## Operators

| Operator | Meaning |
|---|---|
| `+` | Addition / string concatenation |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `==` | Equal |
| `!=` | Not equal |
| `<` | Less than |
| `>` | Greater than |
| `<=` | Less than or equal |
| `>=` | Greater than or equal |

## Syntax Highlighting

Vienie includes editor syntax highlighting for `.vie` source files. The language grammar recognizes keywords, built-ins, functions, strings, numbers, booleans, comments and operators.

The intended Vienie palette includes:

- `let`, `make` → purple
- `say`, `ask` → green
- `if`, `otherwise`, `repeat`, `each` → control-flow color
- `give` → return color
- strings → string color
- numbers → number color
- comments → comment color
- functions → function color

## CLI

```bash
vienie program.vie
vienie
```

## Project

The core pipeline is:

```text
Vienie source (.vie)
        ↓
Lexer
        ↓
Parser
        ↓
AST
        ↓
Runtime
```

## Roadmap

- Better input handling
- Stronger scope handling
- Objects and property access
- Array indexing and assignment
- Better function scope and returns
- Improved source-location errors
- Standard library
- Modules and imports
- Package management
- Dedicated Vienie editor theme
- More editor integrations

## Changelog

### 0.3.0

- Renamed the language from Veyra to Vienie.
- Renamed the CLI from `veyra` to `vienie`.
- Changed the source extension from `.vey` to `.vie`.
- Changed the npm package name to `vienie`.
- Updated documentation and editor metadata.

### 0.2.0

- Added arrays.
- Added `each ... in` iteration.
- Added function returns with `give`.
- Added REPL support.
- Added syntax highlighting support.

### 0.1.0

- Initial Vienie language foundation.
- Added lexer, parser and runtime architecture.

## License

MIT

---

Made by **LivvSKy**.
