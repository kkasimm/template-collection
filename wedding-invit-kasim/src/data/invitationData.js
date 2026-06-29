import musicFile from "../assets/music.mp3";
import groomImg from "../assets/groom.jpg";
import brideImg from "../assets/bride.jpg";
import coupleImg from "../assets/couple.jpg";

export const invitationData = {
  // COUPLE
  couple: {
    groom: {
      name: "Reggie Prabowo Wongkar",
      shortName: "Reggie",
      age: 28,
    },
    bride: {
      name: "Olivia Devina",
      shortName: "Olivia",
      age: 26,
    },
    displayName: "Reggie & Olivia",
    fullDisplayName: "Reggie Prabowo Wongkar & Olivia Devina",
  },

  // EVENT
  event: {
    date: {
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
      mapsUrl: "https://maps.app.goo.gl/UdpgTSd23mTQXeHj7",
    },
    dressCode: {
      spotify: "Sage Green & Dusty Rose",
      tinder: "Coral Pink & White",
      note: "Formal attire preferred",
    },
  },

  // MEDIA
  media: {
    photos: {
      groom: groomImg,
      bride: brideImg,
      couple: coupleImg,
    },
  },

  // MUSIC
  music: {
    file: musicFile,
    title: "Rhapsody JKT48",
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

  // GIFTS
  gifts: {
    enabled: true,
    title: "Kirim Hadiah",
    note: "Doa restu kalian sudah lebih dari cukup, tapi kalau ingin memberi hadiah:",
    methods: [
      {
        id: "address",
        type: "address",
        label: "Alamat Pengiriman Hadiah",
        title: "Keluarga Reggie Prabowo Wongkar",
        detail:
          "Jl. Sudirman No. 88, RT 02/RW 05, Kel. Karet, Jakarta Pusat, DKI Jakarta 10220",
        copyText:
          "Keluarga Reggie Prabowo Wongkar\nJl. Sudirman No. 88, RT 02/RW 05, Kel. Karet, Jakarta Pusat, DKI Jakarta 10220",
        copyButtonLabel: "Copy Alamat",
      },
      {
        id: "bank",
        type: "bank",
        label: "Transfer Bank",
        title: "BCA — 1234567890",
        detail: "a.n. Reggie Prabowo Wongkar",
        copyText: "1234567890",
        copyButtonLabel: "Copy No. Rekening",
      },
      {
        id: "ewallet",
        type: "ewallet",
        label: "E-Wallet",
        title: "GoPay / OVO / Dana",
        detail: "0812-3456-7890 — a.n. Reggie Prabowo Wongkar",
        copyText: "0812-3456-7890",
        copyButtonLabel: "Copy No. E-Wallet",
      },
    ],
  },

  // RSVP
  rsvp: {
    spotify: {
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
    tinder: {
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
  },

  // THEME-SPECIFIC DATA
  themes: {
    spotify: {
      // tambahan khusus tema Spotify, kalau ada di masa depan
    },
    tinder: {
      profiles: [
        {
          id: "groom",
          name: "Reggie Prabowo Wongkar",
          age: 28,
          photoKey: "groom", // merujuk ke media.photos.groom
          bio: "Calon suami terbaik se-Jabodetabek",
          tags: ["Hobi Motret", "Pecinta Kopi", "Gamer Santai"],
          favFood: "Nasi Goreng Kampung",
        },
        {
          id: "bride",
          name: "Olivia Devina",
          age: 26,
          photoKey: "bride", // merujuk ke media.photos.bride
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
    },
  },
};
