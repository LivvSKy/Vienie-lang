# Vienie

<p align="center">
  <img src="https://s4up.vercel.app/s4uP/170658-S4-1000252276.png" alt="Логотип Vienie" width="160">
</p>

<p align="center">
  <strong>Небольшой выразительный язык программирования с понятным синтаксисом.</strong>
</p>

<p align="center">
  <strong>Версия 0.3.0</strong>
</p>

Vienie — лёгкий язык программирования с переменными, функциями, условиями, циклами, коллекциями, вводом/выводом и простой системой выполнения.

## Установка

```bash
npm install -g vienie
```

Проверка:

```bash
vienie --version
```

Запуск программы:

```bash
vienie program.vie
```

## Быстрый старт

```vie
let name = "World"

say "Hello, " + name
```

## Основной синтаксис

| Синтаксис | Назначение | Пример |
|---|---|---|
| `let` | Переменная | `let name = "Nova"` |
| `say` | Вывод | `say "Hello"` |
| `ask` | Ввод | `ask "Your name?"` |
| `if` | Условие | `if age >= 18 { ... }` |
| `otherwise` | Альтернативная ветка | `otherwise { ... }` |
| `repeat` | Повторение | `repeat 3 { ... }` |
| `each` | Итерация | `each item in items { ... }` |
| `in` | Коллекция для итерации | `each item in items { ... }` |
| `make` | Функция | `make add(a, b) { ... }` |
| `give` | Возврат значения | `give a + b` |
| `[]` | Массив | `let items = [1, 2, 3]` |
| `#` | Комментарий | `# Comment` |

## Пример

```vie
make add(a, b) {
    give a + b
}

say add(10, 5)
```

## Конвейер выполнения

```text
Исходный код Vienie
        ↓
      Lexer
        ↓
      Parser
        ↓
       AST
        ↓
     Runtime
```

## Статус

Текущая версия: **0.3.0**

## Changelog

### 0.3.0

- Расширен основной синтаксис
- Переменные и выражения
- Функции с параметрами и возвращаемыми значениями
- Условия
- Циклы и итерации
- Массивы
- Ввод и вывод
- Комментарии
- Файлы `.vie`
- Поддержка подсветки синтаксиса
- CLI `vienie`

## Лицензия

MIT
