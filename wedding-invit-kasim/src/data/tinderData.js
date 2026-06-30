import groomImg from "../assets/groom.jpg";
import brideImg from "../assets/bride.jpg";
import coupleImg from "../assets/couple.jpg";

export const tinderData = {
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
      label: "Coral Pink & White",
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

  profiles: [
    {
      id: "groom",
      name: "Rizki Pratama",
      age: 28,
      photoKey: "groom",
      bio: "Calon suami terbaik se-Jabodetabek",
      tags: ["Hobi Motret", "Pecinta Kopi", "Gamer Santai"],
      favFood: "Nasi Goreng Kampung",
    },
    {
      id: "bride",
      name: "Aulia Zahra",
      age: 26,
      photoKey: "bride",
      bio: "Calon istri yang gemas tapi tegas",
      tags: ["Suka Baca Novel", "Plant Mom", "Karaoke Enthusiast"],
      favFood: "Mie Ayam Pangsit",
    },
  ],

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
      text: "Gimana kalau besok? Aku udah gak sabar",
      time: "10:10",
    },
    { from: "bride", text: "Sip, see you there!", time: "10:11" },
    {
      from: "groom",
      text: "3 tahun kemudian... aku mau lamar kamu",
      time: "Now",
    },
    { from: "bride", text: "Aku mau!", time: "Now" },
  ],

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
    storageKey: "tinder_wishes",
    initialWishes: [
      {
        id: 1,
        name: "Budi Santoso",
        message: "Congrats, it's a match for life!",
        attend: "hadir",
        time: "2 hari lalu",
      },
      {
        id: 2,
        name: "Sari Dewi",
        message: "Semoga jadi pasangan paling bahagia",
        attend: "hadir",
        time: "1 hari lalu",
      },
    ],
  },
};
