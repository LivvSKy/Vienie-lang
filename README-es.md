# Vienie

<p align="center">
  <img src="https://s4up.vercel.app/s4uP/170658-S4-1000252276.png" alt="Logo de Vienie" width="160">
</p>

<p align="center">
  <strong>Un lenguaje de programación pequeño, expresivo y fácil de leer.</strong>
</p>

<p align="center">
  <strong>Versión 0.3.0</strong>
</p>

Vienie es un lenguaje de programación ligero con variables, funciones, condiciones, bucles, colecciones, entrada/salida y un sistema de ejecución sencillo.

## Instalación

```bash
npm install -g vienie
```

Comprueba la instalación:

```bash
vienie --version
```

Ejecuta un programa:

```bash
vienie program.vie
```

## Inicio rápido

```vie
let name = "World"

say "Hello, " + name
```

## Sintaxis

| Sintaxis | Función | Ejemplo |
|---|---|---|
| `let` | Declarar una variable | `let name = "Nova"` |
| `say` | Mostrar salida | `say "Hello"` |
| `ask` | Leer entrada | `ask "Your name?"` |
| `if` | Condición | `if age >= 18 { ... }` |
| `otherwise` | Rama alternativa | `otherwise { ... }` |
| `repeat` | Repetir un bloque | `repeat 3 { ... }` |
| `each` | Iterar valores | `each item in items { ... }` |
| `in` | Seleccionar la colección | `each item in items { ... }` |
| `make` | Definir una función | `make add(a, b) { ... }` |
| `give` | Devolver un valor | `give a + b` |
| `[]` | Crear un array | `let items = [1, 2, 3]` |
| `#` | Añadir un comentario | `# Comment` |

## Funciones

```vie
make add(a, b) {
    give a + b
}

say add(10, 5)
```

## Flujo de ejecución

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

## Estado

Versión actual: **0.3.0**

## Changelog

### 0.3.0

- Sintaxis principal ampliada
- Variables y expresiones
- Funciones con parámetros y valores de retorno
- Condiciones
- Bucles e iteración de colecciones
- Arrays
- Entrada y salida
- Comentarios
- Archivos `.vie`
- Compatibilidad con resaltado de sintaxis
- CLI `vienie`

## Licencia

MIT
