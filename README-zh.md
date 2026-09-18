# Vienie

<p align="center">
  <img src="https://s4up.vercel.app/s4uP/170658-S4-1000252276.png" alt="Vienie Logo" width="160">
</p>

<p align="center">
  <strong>简洁、易读且具有表现力的小型编程语言。</strong>
</p>

<p align="center">
  <strong>版本 0.3.0</strong>
</p>

Vienie 是一门轻量级编程语言，支持变量、函数、条件、循环、集合、输入输出以及简单的执行流程。

## 安装

```bash
npm install -g vienie
```

检查安装：

```bash
vienie --version
```

运行程序：

```bash
vienie program.vie
```

## 快速开始

```vie
let name = "World"

say "Hello, " + name
```

## 基本语法

| 语法 | 用途 | 示例 |
|---|---|---|
| `let` | 声明变量 | `let name = "Nova"` |
| `say` | 输出内容 | `say "Hello"` |
| `ask` | 获取输入 | `ask "Your name?"` |
| `if` | 条件判断 | `if age >= 18 { ... }` |
| `otherwise` | 其他分支 | `otherwise { ... }` |
| `repeat` | 重复执行 | `repeat 3 { ... }` |
| `each` | 遍历值 | `each item in items { ... }` |
| `in` | 指定遍历集合 | `each item in items { ... }` |
| `make` | 定义函数 | `make add(a, b) { ... }` |
| `give` | 返回值 | `give a + b` |
| `[]` | 创建数组 | `let items = [1, 2, 3]` |
| `#` | 添加注释 | `# Comment` |

## 函数

```vie
make add(a, b) {
    give a + b
}

say add(10, 5)
```

## 执行流程

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

## 项目状态

当前版本：**0.3.0**

## Changelog

### 0.3.0

- 扩展核心语法
- 变量和表达式
- 支持参数与返回值的函数
- 条件分支
- 循环与集合遍历
- 数组
- 输入与输出
- 注释
- `.vie` 源文件
- 语法高亮支持
- `vienie` CLI

## 许可证

MIT
