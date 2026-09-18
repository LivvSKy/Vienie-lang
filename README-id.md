# Vienie

<p align="center">
  <img src="https://s4up.vercel.app/s4uP/170658-S4-1000252276.png" alt="Logo Vienie" width="160">
</p>

<p align="center">
  <strong>Bahasa pemrograman kecil dan ekspresif yang dirancang agar mudah dibaca.</strong>
</p>

<p align="center">
  <strong>Versi 0.3.0</strong>
</p>

Vienie adalah bahasa pemrograman ringan dengan sintaks yang mudah dibaca, variabel, fungsi, kondisi, perulangan, koleksi, input/output, dan pipeline eksekusi sederhana.

## Instalasi

```bash
npm install -g vienie
```

Periksa instalasi:

```bash
vienie --version
```

Jalankan program:

```bash
vienie program.vie
```

## Contoh Singkat

Buat `hello.vie`:

```vie
let name = "Dunia"

say "Halo, " + name
```

Jalankan:

```bash
vienie hello.vie
```

## Sintaks

| Sintaks | Kegunaan | Contoh |
|---|---|---|
| `let` | Membuat variabel | `let name = "Nova"` |
| `say` | Menampilkan output | `say "Halo"` |
| `ask` | Membaca input | `ask "Namamu?"` |
| `if` | Percabangan kondisi | `if age >= 18 { ... }` |
| `otherwise` | Cabang alternatif | `otherwise { ... }` |
| `repeat` | Mengulang blok | `repeat 3 { ... }` |
| `each` | Mengiterasi nilai | `each item in items { ... }` |
| `in` | Menentukan koleksi iterasi | `each item in items { ... }` |
| `make` | Membuat fungsi | `make add(a, b) { ... }` |
| `give` | Mengembalikan nilai | `give a + b` |
| `[]` | Membuat array | `let items = [1, 2, 3]` |
| `#` | Membuat komentar | `# Ini komentar` |

## Fungsi

```vie
make add(a, b) {
    give a + b
}

say add(10, 5)
```

## Kondisi

```vie
let age = 17

if age >= 18 {
    say "Dewasa"
} otherwise {
    say "Belum dewasa"
}
```

## Perulangan

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

## Operator

```text
+   -   *   /
==  !=  <   >
<=  >=
```

## Komentar

```vie
# Komentar Vienie
let value = 42
```

## Pipeline Bahasa

```text
Source Vienie
     ↓
   Lexer
     ↓
   Parser
     ↓
    AST
     ↓
  Runtime
```

## Status Proyek

Versi saat ini: **0.3.0**

Vienie terus dikembangkan. Rilis berikutnya dapat memperluas standard library, tooling, dukungan editor, dan fitur bahasa tanpa mengorbankan sintaks yang sederhana.

## Changelog

### 0.3.0

- Sintaks inti diperluas
- Variabel dan ekspresi
- Fungsi dengan parameter dan nilai balik
- Percabangan kondisi
- Perulangan dan iterasi koleksi
- Array
- Input dan output
- Komentar
- File sumber `.vie`
- Dukungan syntax highlighting
- Eksekusi melalui CLI `vienie`

## Lisensi

MIT
