# Vienie

<p align="center">
  <img src="https://s4up.vercel.app/s4uP/170658-S4-1000252276.png" alt="Vienie Logo" width="160">
</p>

<p align="center">
  <strong>A small, expressive programming language designed for clarity.</strong>
</p>

<p align="center">
  <strong>Version 0.3.0</strong>
</p>

Vienie is a lightweight programming language with readable syntax, variables, functions, conditions, loops, collections, input/output, and a simple execution pipeline.

## Installation

```bash
npm install -g vienie
```

Check the installation:

```bash
vienie --version
```

Run a program:

```bash
vienie program.vie
```

## Quick Start

Create `hello.vie`:

```vie
let name = "World"

say "Hello, " + name
```

Run it:

```bash
vienie hello.vie
```

## Syntax

| Syntax | Purpose | Example |
|---|---|---|
| `let` | Declare a variable | `let name = "Nova"` |
| `say` | Print output | `say "Hello"` |
| `ask` | Read user input | `ask "Your name?"` |
| `if` | Conditional branch | `if age >= 18 { ... }` |
| `otherwise` | Alternative branch | `otherwise { ... }` |
| `repeat` | Repeat a block | `repeat 3 { ... }` |
| `each` | Iterate over values | `each item in items { ... }` |
| `in` | Select the collection for iteration | `each item in items { ... }` |
| `make` | Define a function | `make add(a, b) { ... }` |
| `give` | Return a value | `give a + b` |
| `[]` | Create an array | `let items = [1, 2, 3]` |
| `#` | Add a comment | `# This is a comment` |

## Functions

```vie
make add(a, b) {
    give a + b
}

say add(10, 5)
```

## Conditions

```vie
let age = 17

if age >= 18 {
    say "Adult"
} otherwise {
    say "Minor"
}
```

## Loops

```vie
repeat 3 {
    say "Vienie!"
}
```

```vie
let names = ["Ari", "Mika", "Rin"]

each name in names {
    say name
}
```

## Operators

```text
+   -   *   /
==  !=  <   >
<=  >=
```

## Comments

```vie
# A Vienie comment
let value = 42
```

## Language Pipeline

```text
Vienie Source
     ↓
   Lexer
     ↓
   Parser
     ↓
    AST
     ↓
  Runtime
```

The implementation separates lexical analysis, parsing, the abstract syntax tree, and runtime execution.

## Syntax Highlighting

Vienie source files use the `.vie` extension.

Editors can distinguish language constructs such as:

- `let`, `make` for declarations
- `say`, `ask` for input/output
- `if`, `otherwise`, `repeat`, `each`, `in` for control flow
- `give` for returned values
- strings, numbers, comments, and function calls

## Example Program

```vie
let name = "Vienie"
let count = 3

say "Welcome to " + name

repeat count {
    say "Learning Vienie"
}

make multiply(a, b) {
    give a * b
}

say multiply(6, 7)
```

## Project Status

Current version: **0.3.0**

Vienie is actively evolving. Future releases may expand the standard library, tooling, editor support, and language features while keeping the syntax focused and readable.

## Changelog

### 0.3.0

- Expanded core language syntax
- Variables and expressions
- Functions with parameters and return values
- Conditional execution
- Repetition and collection iteration
- Arrays
- Input and output
- Comments
- `.vie` source files
- Syntax highlighting support
- CLI execution through `vienie`

## License

MIT
