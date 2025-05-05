# Spam Detector (Naive Bayes, TypeScript)

Sebuah proyek sederhana untuk mendeteksi spam SMS menggunakan algoritma **Naive Bayes** yang diimplementasikan dari nol dalam TypeScript.

## Fitur

- Klasifikasi pesan sebagai `spam` atau `ham`
- Preprocessing teks (lowercase, filtering, stemming, stopwords)
- Rare word filtering
- Laplace smoothing
- Dataset split: train/test
- CLI interface untuk prediksi pesan secara langsung
- Evaluasi akurasi model

## Struktur Folder

```
├── data/              # Dataset asli (SMS Spam Collection)
├── model/             # File model hasil training
├── utils/             # Helper function untuk text & file
├── naiveBayes.ts      # Implementasi core Naive Bayes
├── train.ts           # Script untuk training
├── predict.ts         # CLI prediksi pesan
├── evaluate.ts        # Evaluasi performa model
├── split.ts           # Split dataset ke train/test
└── README.md
```

## Cara Jalanin

1. Install dependencies

```
pnpm install
```

2. Training Model

```
pnpm train
```

3. Prediksi Pesan

```
pnpm predict
```

4. Evaluasi Akurasi

```
pnpm evaluate
```

## Dataset

Proyek ini menggunakan dataset SMS Spam Collection dari UCI Machine Learning Repository.

## Progress & Akurasi

Saat ini model telah dilengkapi dengan:

- Stopword filtering

- Stemming

- Rare word filtering

- Laplace smoothing


**Akurasi saat ini**: ~19% (dengan test set setelah preprocessing dan smoothing)

## TODO

[ ] Tambah visualisasi seperti confusion matrix

[ ] Eksperimen fitur tambahan: n-grams, tf-idf

[ ] Optimasi tokenisasi & preprocessing

[ ] Tulis artikel/blog tentang proses pembuatan


## Lisensi

MIT


