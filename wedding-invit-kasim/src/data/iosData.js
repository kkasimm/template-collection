import musicFile from "../assets/beautiful-in-white.mp3";
import groomImg from "../assets/groom.jpg";
import brideImg from "../assets/bride.jpg";
import coupleImg from "../assets/couple.jpg";

export const iosData = {
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
      groom: groomImg,
      bride: brideImg,
      couple: coupleImg,
    },
  },

  music: {
    file: musicFile,
    title: "Beautiful In White Westlife",
    artist: "Wedding Playlist · 2025",
    tracks: [
      {
        number: "01",
        title: "Pertemuan Pertama",
        duration: "3:24",
        active: false,
      },
      {
        number: "02",
        title: "Jatuh Tanpa Sadar",
        duration: "4:01",
        active: true,
      },
      {
        number: "03",
        title: "Bertahan di Sisi",
        duration: "3:47",
        active: false,
      },
      { number: "04", title: "Lamaran", duration: "5:12", active: false },
      { number: "05", title: "Selamanya", duration: "∞", active: false },
    ],
  },

  messagePreview: {
    sender: "Reggie",
    text: "Jangan lupa ya, kita nikah! 💍",
  },

  chatStory: [
    {
      from: "groom",
      text: "Halo, kayaknya kita satu circle deh?",
      time: "10:02",
    },
    {
      from: "bride",
      text: "Eh iya bener! Akhirnya kenalan juga",
      time: "10:03",
    },
    {
      from: "groom",
      text: "Mau ngobrol lebih lanjut sambil ngopi?",
      time: "10:05",
    },
    {
      from: "bride",
      text: "Boleh banget, kapan kita beneran ketemu?",
      time: "10:07",
    },
    {
      from: "groom",
      text: "3 tahun kemudian... aku mau lamar kamu",
      time: "Now",
    },
    { from: "bride", text: "Aku mau!", time: "Now" },
  ],

  weatherQuote: {
    condition: "In Love, Forever",
    temp: "∞°",
    quotes: [
      "Cinta itu bukan tentang menemukan orang yang sempurna, tapi belajar melihat orang yang tidak sempurna dengan cara yang sempurna.",
      "Bersamamu, setiap hari terasa seperti cuaca terbaik dalam hidupku.",
    ],
  },

  gifts: {
    enabled: true,
    note: "Doa restu kalian sudah lebih dari cukup, tapi kalau ingin memberi hadiah:",
    methods: [
      {
        id: "address",
        type: "address",
        label: "Alamat Pengiriman Hadiah",
        title: "Keluarga Reggie Prabowo Wongso",
        detail:
          "Jl. Sudirman No. 88, RT 02/RW 05, Kel. Karet, Jakarta Pusat, DKI Jakarta 10220",
        copyText:
          "Keluarga Reggie Prabowo Wongso\nJl. Sudirman No. 88, RT 02/RW 05, Kel. Karet, Jakarta Pusat, DKI Jakarta 10220",
        copyButtonLabel: "Copy Alamat",
      },
      {
        id: "bank",
        type: "bank",
        label: "Transfer Bank",
        title: "BCA — 1234567890",
        detail: "a.n. Reggie Prabowo Wongso",
        copyText: "1234567890",
        copyButtonLabel: "Copy No. Rekening",
      },
      {
        id: "ewallet",
        type: "ewallet",
        label: "E-Wallet",
        title: "GoPay / OVO / Dana",
        detail: "0812-3456-7890 — a.n. Reggie Prabowo Wongso",
        copyText: "0812-3456-7890",
        copyButtonLabel: "Copy No. E-Wallet",
      },
    ],
  },

  rsvp: {
    storageKey: "lockscreen_wishes",
    initialWishes: [
      {
        id: 1,
        name: "Budi Santoso",
        message: "Semoga sakinah mawaddah warahmah",
        attend: "hadir",
        time: "2 hari lalu",
      },
    ],
  },
};
