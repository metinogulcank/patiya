# Hayvan Sahiplendirme Mobil Uygulaması

Bu proje, hayvan sahiplendirme süreçlerini kolaylaştırmak ve hızlandırmak için geliştirilmiş bir mobil uygulamadır. React Native, Expo ve Tailwind CSS kullanılarak geliştirilmiştir ve yalnızca Android platformunda çalışmaktadır.

## Özellikler

- **Hayvan Listeleme**: Kullanıcılar, sahiplendirilmeyi bekleyen hayvanların listesini görebilir.
- **Detay Sayfası**: Her bir hayvan için detaylı bilgi görüntüleme imkanı.
- **Başvuru Formu**: Kullanıcılar, sahiplendirme başvurusu yapabilir.
- **Kullanıcı Dostu Arayüz**: Modern ve sade bir tasarım.
- **Performans Optimizasyonu**: Hızlı ve etkili bir kullanıcı deneyimi.

## Kullanılan Teknolojiler

- **React Native**: Mobil uygulama geliştirme için kullanılan JavaScript framework'ü.
- **Expo**: React Native uygulamalarını hızlıca geliştirme ve test etme imkanı.
- **Tailwind CSS**: Hızlı ve özelleştirilebilir bir CSS framework'ü.

## Gereksinimler

Bu projeyi çalıştırmak için aşağıdaki araçların yüklü olması gerekir:

- Node.js (>=14.x)
- npm veya yarn
- Expo CLI
- Android Studio (Android Emulator veya fiziksel cihaz ile test için)

## Kurulum

1. Depoyu klonlayın:

   ```bash
   git clone https://github.com/metinogulcank/patiya.git
   cd patiya
   ```

2. Gerekli bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

3. Expo CLI'yi global olarak yüklemediyseniz yükleyin:

   ```bash
   npm install -g expo-cli
   ```

4. Uygulamayı çalıştırın:

   ```bash
   expo start
   ```

5. Uygulamayı Android cihazda veya emulatorde test edin.

## Proje Yapısı

├── app/                   # Ana uygulama dosyaları
│   ├── tabs/              # Sekmelerin bulunduğu ekranlar (Home, Favorite, Inbox, vb.)
│   │   ├── _layout.jsx    # Sekme düzeni
│   │   ├── favorite.jsx   # Favori hayvanları listeleme ekranı
│   │   ├── home.jsx       # Ana sayfa
│   │   ├── inbox.jsx      # Gelen kutusu
│   │   ├── profile.jsx    # Kullanıcı profili
│   ├── add-new-pet/       # Yeni bir hayvan ekleme ekranı
│   ├── chat/              # Mesajlaşma sistemi dosyaları
│   ├── login/             # Giriş ekranı dosyaları
│   ├── pet-details/       # Hayvan detaylarını görüntüleme ekranı
│   ├── user-post/         # Kullanıcı tarafından eklenen hayvanların listesi
│   ├── _layout.jsx        # Genel uygulama düzeni
│   └── index.jsx          # Giriş noktası
├── assets/                # Uygulama için kullanılan medya dosyaları (resimler, ikonlar, vb.)
├── components/            # Tekrar kullanılabilir React Native bileşenleri
├── config/                # Uygulama yapılandırma dosyaları
├── constants/             # Sabit değerler (ör. renkler, fontlar, API URL'leri)
├── Shared/                # Ortak kullanılan yardımcı bileşenler ve dosyalar
│   └── Shared.jsx         # Paylaşılan bileşenler
├── .env                   # Ortam değişkenlerini tanımlayan dosya (API anahtarları vb.)
├── .gitignore             # Git tarafından yoksayılacak dosyalar
├── app.json               # Expo proje ayarları
├── eas.json               # Expo Application Services (EAS) yapılandırması
├── expo-env.d.ts          # TypeScript için ortam değişkenleri tanımı
├── package.json           # Proje bağımlılıkları ve komutları
├── package-lock.json      # Bağımlılıkların kesin sürüm bilgisi
├── README.md              # Proje açıklaması ve dokümantasyonu
└── tsconfig.json          # TypeScript yapılandırma dosyası



## Katkıda Bulunma

Katkıda bulunmak isterseniz:

1. Bu repoyu forklayın.
2. Yeni bir özellik veya düzeltme için bir branch oluşturun.
   ```bash
   git checkout -b yeni-ozellik
   ```
3. Yaptığınız değişiklikleri commit edin.
   ```bash
   git commit -m "Özellik eklendi"
   ```
4. Branch'inizi push edin.
   ```bash
   git push origin yeni-ozellik
   ```
5. Bir Pull Request açın.

## İletişim

Sorularınız veya önerileriniz için benimle iletişime geçebilirsiniz:

- **E-posta**: metinogulcank06@gmail.com
- **GitHub**: https://github.com/metinogulcank

---

Bu proje, hayvan sahiplendirme süreçlerini dijitalleştirerek topluma katkı sağlamayı amaçlamaktadır. Katkılarınız ve geri bildirimleriniz bizim için çok değerli!
