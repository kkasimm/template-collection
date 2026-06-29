import {
  Coffee, Map, CloudRain, UtensilsCrossed, Sparkles, Cake
} from "lucide-react";

const TIMELINE_ICONS = [Coffee, Map, CloudRain, UtensilsCrossed, Sparkles, Cake];
const birthdayData = {
  // ── Identitas (required) 
  toName: "Naira",          // Nama penerima
  fromName: "Raka",         // Nama pengirim

  // ── Musik latar (opsional — isi URL/path file audio, atau null) 
  
  music: null,

  // ── Pesan utama — array paragraf (required) 
  message: [
    "Hai, kamu yang selalu bikin hari-hariku lebih berwarna.",
    "Hari ini bukan hari biasa — ini hari kamu lahir ke dunia, dan aku bersyukur banget buat itu.",
    "Setiap momen bersamamu selalu terasa seperti hadiah yang nggak pernah aku minta, tapi selalu aku butuhkan.",
    "Terima kasih sudah ada, sudah mau dikenal, dan sudah mau jadi bagian dari ceritaku.",
    "Selamat ulang tahun. Semoga tahun ini lebih indah dari semua yang sudah kita lewati. 🎂",
  ],

  // ── Timeline — momen penting bersama 
  timeline: [
    { date: "14 Feb 2022", label: "Pertama kali ketemu di kafe sudut itu", emoji: "☕" },
    { date: "23 Apr 2022", label: "Jalan pertama — nyasar tapi seru banget", emoji: "🗺️" },
    { date: "01 Jul 2022", label: "Nonton hujan dari jendela kamarmu", emoji: "🌧️" },
    { date: "17 Agt 2022", label: "Masak bareng dan gagal total, tapi ketawa terus", emoji: "🍳" },
    { date: "31 Des 2022", label: "Malam tahun baru — kamu tidur sebelum jam 12", emoji: "🎆" },
    { date: "29 Jun 2023", label: "Hari ini — ulang tahunmu yang ke sekian 🎉", emoji: "🎂" },
  ],

  // ── Wishes — harapan untuk penerima 
  wishes: [
    { emoji: "🌟", text: "Semoga kamu selalu dikelilingi orang-orang yang mencintaimu dengan tulus." },
    { emoji: "💪", text: "Semoga mimpi-mimpimu yang paling berani jadi kenyataan tahun ini." },
    { emoji: "😂", text: "Semoga kamu ketawa setiap hari, bahkan di hari yang paling berat sekalipun." },
    { emoji: "🌈", text: "Semoga kesehatan selalu menyertaimu ke mana pun kamu pergi." },
    { emoji: "✨", text: "Semoga kamu bangga dengan dirimu sendiri — karena kamu layak untuk itu." },
    { emoji: "🫂", text: "Semoga kamu tahu bahwa ada yang selalu ada untukmu, setiap saat." },
  ],

  // ── Quote spesial — satu kalimat bermakna 
  quote: {
    text: "Kamu bukan hanya bagian dari hariku — kamu adalah alasannya.",
    author: "— untukmu, dengan sepenuh hati",
  },

  // ── Galeri foto 
photos: [
  "https://picsum.photos/seed/memory1/400/533",
  "https://picsum.photos/seed/memory2/400/533",
  "https://picsum.photos/seed/memory3/400/533",
  "https://picsum.photos/seed/memory4/400/533",
],
  // ── Surprise interaktif di penutup 
  surpriseLabel: "Ketuk untuk hadiah kecilku 🎁",     
  surpriseMessage: "Hadiahnya adalah aku — setiap hari, selalu. 💕", 
};

export default birthdayData;