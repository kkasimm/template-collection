import musicFile from "../assets/music.mp3";
import coupleImg from "../assets/couple.jpg";

export const spotifyData = {
  couple: {
    groom: { name: "Reggie Prabowo Wongso", shortName: "Reggie", age: 28 },
    bride: { name: "Olivia Devina", shortName: "Olivia", age: 26 },
    displayName: "Reggie & Olivia",
    fullDisplayName: "Reggie Prabowo Wongso & Olivia Devina",
  },

  event: {
    date: {
      iso: "2025-06-14T08:00:00",
      full: "Sabtu, 14 Juni 2025",
      short: "14 · 06 · 2025",
      year: "2025",
    },
    schedule: [
      { label: "Akad", time: "08.00 WIB" },
      { label: "Resepsi", time: "11.00 WIB" },
    ],
    venue: {
      name: "Gedung Serbaguna Harmoni",
      address: "Jl. Sudirman No. 88, Jakarta Pusat",
      mapsUrl: "https://maps.app.goo.gl/NW9zqZmSrXrkA2ot5",
    },
    dressCode: {
      label: "Sage Green & Dusty Rose",
      note: "Formal attire preferred",
    },
  },

  media: {
    photos: {
      couple: coupleImg,
    },
  },

  music: {
    file: musicFile,
    title: "Rapsodi JKT48",
    artist: "Wedding Playlist · 2025",
    subtitle: "A love story, written in songs",
    tracks: [
      {
        number: "01",
        title: "Pertemuan Pertama",
        lyric: "Seperti playlist baru yang langsung masuk ke hati",
        duration: "3:24",
        active: false,
      },
      {
        number: "02",
        title: "Jatuh Tanpa Sadar",
        lyric: "Lagu favoritmu jadi lagu favoritku juga",
        duration: "4:01",
        active: true,
      },
      {
        number: "03",
        title: "Bertahan di Sisi",
        lyric: "Repeat mode — selalu ingin diputar lagi",
        duration: "3:47",
        active: false,
      },
      {
        number: "04",
        title: "Lamaran",
        lyric: "Track terbaik dalam album hidup ini",
        duration: "5:12",
        active: false,
      },
      {
        number: "05",
        title: "Selamanya",
        lyric: "Tidak ada skip, tidak ada pause — hanya play",
        duration: "∞",
        active: false,
      },
    ],
  },

  gifts: {
    enabled: true,
    title: "Kirim Hadiah",
    note: "Doa restu kalian sudah lebih dari cukup, tapi kalau ingin memberi hadiah:",
    methods: [
      {
        id: "address",
        type: "address",
        label: "Alamat Pengiriman Hadiah",
        title: "Keluarga Rizki Pratama",
        detail:
          "Jl. Sudirman No. 88, RT 02/RW 05, Kel. Karet, Jakarta Pusat, DKI Jakarta 10220",
        copyText:
          "Keluarga Rizki Pratama\nJl. Sudirman No. 88, RT 02/RW 05, Kel. Karet, Jakarta Pusat, DKI Jakarta 10220",
        copyButtonLabel: "Copy Alamat",
      },
      {
        id: "bank",
        type: "bank",
        label: "Transfer Bank",
        title: "BCA — 1234567890",
        detail: "a.n. Rizki Pratama",
        copyText: "1234567890",
        copyButtonLabel: "Copy No. Rekening",
      },
      {
        id: "ewallet",
        type: "ewallet",
        label: "E-Wallet",
        title: "GoPay / OVO / Dana",
        detail: "0812-3456-7890 — a.n. Rizki Pratama",
        copyText: "0812-3456-7890",
        copyButtonLabel: "Copy No. E-Wallet",
      },
    ],
  },

  rsvp: {
    storageKey: "spotify_wishes",
    initialWishes: [
      {
        id: 1,
        name: "Budi Santoso",
        message: "Semoga menjadi keluarga yang sakinah mawaddah warahmah",
        attend: "hadir",
        time: "2 hari lalu",
      },
      {
        id: 2,
        name: "Sari Dewi",
        message:
          "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fi khair",
        attend: "hadir",
        time: "1 hari lalu",
      },
      {
        id: 3,
        name: "Andi Pratama",
        message:
          "Selamat menempuh hidup baru! Semoga langgeng sampai kakek nenek",
        attend: "tidak",
        time: "5 jam lalu",
      },
    ],
  },
};
