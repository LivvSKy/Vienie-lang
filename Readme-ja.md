<div align="center">

<img src="https://s4up.vercel.app/s4uP/170658-S4-1000252276.png" alt="Vienie" width="180">

# Vienie

**Vienie は独自の lexer、parser、AST、runtime を持つ軽量なオリジナルプログラミング言語です。**

[English](Readme.md) · Bahasa Indonesia · [Русский](Readme-ru.md) · [日本語](Readme-ja.md) · [简体中文](Readme-zh.md) · [Español](Readme-es.md)

</div>

## Tentang

Vienie adalah bahasa pemrograman orisinal dengan lexer, parser, AST, dan runtime sendiri. File sumber menggunakan ekstensi `.vie` dan CLI-nya adalah `vienie`.

Vienie bukan JavaScript yang sekadar mengganti nama keyword. JavaScript digunakan untuk mengimplementasikan toolchain saat ini, sedangkan Vienie memiliki syntax dan pipeline bahasanya sendiri.

## Instalasi

```bash
npm install -g vienie
```

Jalankan program:

```bash
vienie program.vie
```

REPL:

```bash
vienie
```

## Syntax & Kegunaan

| Syntax | Kegunaan | Contoh |
|---|---|---|
| `let` | Membuat variabel | `let name = "Livio"` |
| `say` | Menampilkan nilai | `say "Hello"` |
| `ask` | Meminta input | `ask "Nama kamu?"` |
| `if` | Membuat kondisi | `if age >= 15 { ... }` |
| `otherwise` | Cabang alternatif | `otherwise { ... }` |
| `repeat` | Mengulang blok | `repeat 3 { ... }` |
| `each` | Iterasi collection | `each item in items { ... }` |
| `in` | Menentukan collection iterasi | `each item in items` |
| `make` | Membuat function | `make add(a, b) { ... }` |
| `give` | Mengembalikan nilai | `give a + b` |
| `[]` | Membuat array | `let scores = [10, 20, 30]` |
| `#` | Membuat komentar | `# komentar` |

## Contoh

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

## Operator

`+` `-` `*` `/` `==` `!=` `<` `>` `<=` `>=`

## Syntax Highlighting

Vienie mendukung syntax highlighting untuk file `.vie`. Grammar mengenali keyword, built-in, function, string, angka, boolean, komentar, dan operator.

Palet yang dituju:

- `let`, `make` → ungu
- `say`, `ask` → hijau
- control flow → warna khusus control
- `give` → warna return
- string → warna string
- angka → warna angka

## Pipeline

```text
Vienie (.vie)
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

- Input yang lebih baik
- Scope yang lebih kuat
- Object dan property access
- Array indexing dan assignment
- Standard library
- Module dan import
- Package management
- Theme editor khusus Vienie

## Changelog

### 0.3.0
- Nama Veyra diubah menjadi Vienie.
- CLI `veyra` diubah menjadi `vienie`.
- Ekstensi `.vey` diubah menjadi `.vie`.
- Nama package npm diubah menjadi `vienie`.
- Dokumentasi dan metadata editor diperbarui.

### 0.2.0
- Array.
- `each ... in`.
- Return function dengan `give`.
- REPL.
- Syntax highlighting.

### 0.1.0
- Fondasi lexer, parser, dan runtime.

## Lisensi

MIT
