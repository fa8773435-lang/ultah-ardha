# Birthday Letter for Mas Ardha 🤎

Website ulang tahun digital dengan 8 scene interaktif, permainan tanggal, foto, cerita jarak Jepang–Kediri, tiga kartu alasan, kalender November 2001, dan surat penutup.

## Struktur proyek

```text
birthday-letter-mas-ardha/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── ardha-photo.jpg
    └── birthday-music.mp3  (opsional)
```

## Menjalankan website
1. Ekstrak folder proyek.
2. Buka folder `birthday-letter-mas-ardha` di VS Code.
3. Pastikan foto Mas Ardha berada di `assets/ardha-photo.jpg` (foto yang kamu kirim sudah disertakan).
4. Opsional: tambahkan musik milikmu dengan nama `birthday-music.mp3` ke folder `assets`.
5. Buka `index.html`, klik kanan, lalu pilih **Open with Live Server**.

## Catatan teknis
- Kunci permainan yang benar adalah `151225`.
- Jawaban salah menampilkan pesan dan animasi goyang; jawaban benar membuka scene foto.
- Kalender memakai susunan November 2001 yang benar. Tanggal 7 November 2001 jatuh pada hari Rabu.
- Musik tidak disertakan. Tombol musik bekerja setelah file audio ditambahkan dan diklik oleh pengunjung.
- Google Fonts memerlukan koneksi internet; tersedia font cadangan jika offline.
- Untuk publikasi, unggah seluruh folder ke GitHub Pages atau Netlify.
