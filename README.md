# Todo List App

Aplikasi manajemen tugas berbasis web yang berjalan sepenuhnya di sisi klien (client-side). Dibangun dengan HTML, CSS, dan JavaScript murni tanpa framework maupun dependensi runtime — cukup buka `index.html` di browser untuk langsung menggunakannya.

---

## Fitur Utama

- **Tambah tugas** — masukkan deskripsi tugas (3–50 karakter) lalu tekan tombol "Tambah" atau Enter.
- **Tandai selesai / belum selesai** — toggle status tugas dengan sekali klik; teks tugas akan dicoret saat selesai.
- **Hapus tugas** — hapus tugas individual kapan saja.
- **Counter progres** — header menampilkan jumlah tugas yang sudah selesai dari total keseluruhan.
- **Urutan terbaru di atas** — tugas baru selalu muncul di bagian paling atas daftar.
- **Empty state** — pesan khusus ditampilkan saat daftar tugas kosong.
- **Validasi input** — menolak input kosong, terlalu pendek (< 3 karakter), atau terlalu panjang (> 50 karakter) dengan pesan error.
- **Persistensi data** — semua tugas disimpan ke `localStorage` sehingga data tetap ada setelah halaman di-refresh.
- **Optimistic update + rollback** — state diperbarui segera di memori; jika penyimpanan ke localStorage gagal, state dikembalikan ke kondisi sebelumnya.
- **Aksesibilitas** — elemen interaktif dilengkapi atribut `aria-label`, `aria-live`, dan `aria-pressed`.

---

## Instalasi dan Menjalankan Proyek

### Menjalankan Aplikasi

Tidak diperlukan instalasi atau build step apa pun.

1. Clone atau unduh repositori ini.
2. Buka file `index.html` di browser mana pun.

```
Buka index.html di browser
```

### Menjalankan Tes

Proyek menggunakan [Vitest](https://vitest.dev/) untuk pengujian. Pastikan [Node.js](https://nodejs.org/) sudah terinstal.

1. Install dependensi pengembangan:

```bash
npm install
```

2. Jalankan seluruh test suite (single pass):

```bash
npm test
```

atau secara langsung:

```bash
npx vitest --run
```

---

## Struktur Folder

```
latihan/
├── index.html        # Entry point — struktur HTML dan pemuatan script
├── style.css         # Seluruh styling, layout, dan visual state
├── storage.js        # Layer storage — baca/tulis localStorage
├── todo.js           # Layer logika — state in-memory dan operasi CRUD
└── ui.js             # Layer UI — render DOM dan penanganan event
```

### Arsitektur Tiga Layer

Script dimuat secara berurutan sesuai dependensi:

```
storage.js  -->  todo.js  -->  ui.js
```

| Layer   | File         | Tanggung Jawab |
|---------|--------------|----------------|
| Storage | `storage.js` | `saveTodos()`, `loadTodos()` — satu-satunya layer yang mengakses localStorage |
| Logika  | `todo.js`    | `addTodo()`, `toggleTodo()`, `deleteTodo()`, `getTodos()`, `initTodos()` — mengelola state in-memory |
| UI      | `ui.js`      | `renderTodos()`, `createTodoElement()`, event listeners — satu-satunya layer yang mengakses DOM |

Aturan batas layer: UI tidak pernah mengakses localStorage secara langsung; Logika tidak pernah mengakses DOM secara langsung.

---

## Teknologi yang Digunakan

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| HTML5 | — | Struktur aplikasi dan entry point |
| CSS3 | — | Styling, layout, dan visual state |
| JavaScript (ES6+) | — | Logika aplikasi, manipulasi DOM, penanganan event |
| localStorage (Web API) | — | Persistensi data di sisi klien |
| Vitest | 2.1.9 | Test runner untuk pengujian unit |
| fast-check | 3.23.2 | Property-based testing (minimum 100 run per properti) |
| jsdom | ^25.0.1 | Simulasi DOM untuk pengujian di lingkungan Node.js |

Tidak ada framework JavaScript, bundler, atau dependensi runtime eksternal. Aplikasi berjalan langsung di browser.
