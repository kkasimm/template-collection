import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SectionOpener({ audioRef, isPlaying, onSectionExit }) {
  const fillRef = useRef(null);
  const timeRef = useRef(null);
  const sectionRef = useRef(null);

  // Ambil nama tamu dari URL ?nama=...
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("nama") || null;

  // Sync progress bar & waktu dengan audio
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const update = () => {
      const duration = audio.duration || 0;
      const current = audio.currentTime || 0;
      const pct = duration ? (current / duration) * 100 : 0;

      if (fillRef.current) fillRef.current.style.width = `${pct}%`;
      if (timeRef.current) {
        const fmt = (s) => {
          const m = Math.floor(s / 60);
          const sec = Math.floor(s % 60);
          return `${m}:${sec.toString().padStart(2, "0")}`;
        };
        timeRef.current.textContent = fmt(current);
      }
    };

    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, [audioRef]);

  // Sembunyikan MusicPlayer saat di section opener, tampilkan setelah scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !onSectionExit) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Kalau opener sudah tidak terlihat → tampilkan music player
        onSectionExit(!entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [onSectionExit]);

  // Format durasi audio
  const [duration, setDuration] = useState("∞");
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;
    const onLoaded = () => {
      const d = audio.duration;
      if (d && isFinite(d)) {
        const m = Math.floor(d / 60);
        const s = Math.floor(d % 60);
        setDuration(`${m}:${s.toString().padStart(2, "0")}`);
      }
    };
    audio.addEventListener("loadedmetadata", onLoaded);
    if (audio.readyState >= 1) onLoaded();
    return () => audio.removeEventListener("loadedmetadata", onLoaded);
  }, [audioRef]);

  return (
    <section className="section-opener" ref={sectionRef}>
      <div className="opener-bg-grid" />
      <div className="opener-bg-glow" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Kepada tamu */}
        {guestName && (
          <motion.div variants={item} className="opener-guest">
            Kepada Yth. <span>{guestName}</span>
          </motion.div>
        )}

        <motion.div variants={item} className="opener-label">
          Wedding Invitation
        </motion.div>

        <motion.div
          variants={item}
          className="opener-cover"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          💑
        </motion.div>

        {/* Nama mempelai */}
        <motion.div variants={item} className="opener-couple">
          Rizki Pratama
          <span className="opener-couple-amp">&</span>
          Aulia Zahra
        </motion.div>

        <motion.div variants={item} className="opener-now-playing">
          Now Playing
        </motion.div>

        <motion.h1 variants={item} className="opener-title">
          Rhapsody
          <br />
          <span style={{ color: "#1DB954" }}>JKT48</span>
        </motion.h1>

        <motion.p variants={item} className="opener-subtitle">
          A love story, written in songs
        </motion.p>

        {/* Progress bar sinkron audio */}
        <motion.div variants={item} className="opener-progress">
          <div className="opener-progress-bar">
            <div ref={fillRef} className="opener-progress-fill" />
          </div>
          <div className="opener-progress-times">
            <span ref={timeRef}>0:00</span>
            <span>{duration}</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="opener-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span>Scroll</span>
        <div className="scroll-chevron" />
      </motion.div>
    </section>
  );
}
