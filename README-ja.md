# Vienie

<p align="center">
  <img src="https://s4up.vercel.app/s4uP/170658-S4-1000252276.png" alt="Vienie ロゴ" width="160">
</p>

<p align="center">
  <strong>読みやすさを重視した、小さく表現力のあるプログラミング言語。</strong>
</p>

<p align="center">
  <strong>バージョン 0.3.0</strong>
</p>

Vienie は、変数、関数、条件分岐、ループ、コレクション、入出力を備えた軽量なプログラミング言語です。

## インストール

```bash
npm install -g vienie
```

確認:

```bash
vienie --version
```

実行:

```bash
vienie program.vie
```

## クイックスタート

```vie
let name = "World"

say "Hello, " + name
```

## 基本構文

| 構文 | 用途 | 例 |
|---|---|---|
| `let` | 変数を宣言 | `let name = "Nova"` |
| `say` | 出力 | `say "Hello"` |
| `ask` | 入力 | `ask "Your name?"` |
| `if` | 条件分岐 | `if age >= 18 { ... }` |
| `otherwise` | 別の分岐 | `otherwise { ... }` |
| `repeat` | 繰り返し | `repeat 3 { ... }` |
| `each` | 要素を反復 | `each item in items { ... }` |
| `in` | 反復対象を指定 | `each item in items { ... }` |
| `make` | 関数を定義 | `make add(a, b) { ... }` |
| `give` | 値を返す | `give a + b` |
| `[]` | 配列 | `let items = [1, 2, 3]` |
| `#` | コメント | `# Comment` |

## 関数

```vie
make add(a, b) {
    give a + b
}

say add(10, 5)
```

## 実行パイプライン

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

## ステータス

現在のバージョン: **0.3.0**

## Changelog

### 0.3.0

- コア構文を拡張
- 変数と式
- パラメータと戻り値を持つ関数
- 条件分岐
- ループとコレクション反復
- 配列
- 入出力
- コメント
- `.vie` ファイル
- シンタックスハイライト対応
- `vienie` CLI

## ライセンス

MIT
