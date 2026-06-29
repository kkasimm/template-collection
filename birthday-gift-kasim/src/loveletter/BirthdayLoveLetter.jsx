import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import anime from "animejs";
import {
  ChevronDown,
  Volume2,
  VolumeX,
  Heart,
  Gift,
  Sparkles,
  Calendar,
  MapPin,
  CloudRain,
  UtensilsCrossed,
  Moon,
  Cake,
  Star,
  Laugh,
  Activity,
  Rainbow,
  Trophy,
  Handshake,
  Clock,
  Coffee,
  Mail,
  Image,
} from "lucide-react";
import birthdayData from "../data/birthdayData";
import "./BirthdayLoveLetter.css";

// ═══════════════════════════════════════════════════════════════════
//  FRAMER MOTION VARIANTS
// ═══════════════════════════════════════════════════════════════════

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7 } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const staggerFast = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardEntrance = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const floating = {
  animate: {
    y: [0, -12, 0],
    rotate: [-1, 1, -1],
    transition: { repeat: Infinity, duration: 4, ease: "easeInOut" },
  },
};

// Letter-by-letter reveal untuk hero title
function LetterReveal({ text }) {
  return (
    <motion.span
      variants={staggerFast}
      initial="hidden"
      animate="show"
      aria-label={text}
      style={{ display: "inline-block" }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 30, rotate: -8 },
            show: {
              opacity: 1,
              y: 0,
              rotate: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ── Icon mapping untuk Timeline ──────────────────────────────────
const TIMELINE_ICONS = [Coffee, MapPin, CloudRain, UtensilsCrossed, Moon, Cake];

// ── Icon mapping untuk Wishes ─────────────────────────────────────
const WISH_ICONS = [Star, Trophy, Laugh, Activity, Heart, Handshake];

// Confetti burst saat hero muncul
function ConfettiBurst() {
  const colors = ["#ff6fa5", "#ffd23f", "#6fe7c9", "#b98eff", "#ff9f43"];
  const pieces = Array.from({ length: 28 });

  return (
    <div className="ll-confetti-wrap" aria-hidden="true">
      {pieces.map((_, i) => {
        const angle = (i / pieces.length) * 360;
        const dist = 80 + Math.random() * 80;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * dist;
        const y = Math.sin(rad) * dist;
        const color = colors[i % colors.length];
        const size = 6 + Math.round(Math.random() * 8);
        const delay = i * 0.025;

        return (
          <motion.div
            key={i}
            className="ll-confetti-piece"
            style={{
              background: color,
              width: size,
              height: size,
              borderRadius: i % 3 === 0 ? "50%" : 2,
              border: "1.5px solid #221b3a",
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x, y, opacity: 0, scale: 0, rotate: angle * 2 }}
            transition={{ duration: 1.1, delay, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  KOMPONEN UTAMA
// ═══════════════════════════════════════════════════════════════════

export default function BirthdayLoveLetter() {
  const [stage, setStage] = useState("closed");
  const [isPlaying, setIsPlaying] = useState(false);
  const [surpriseOpened, setSurpriseOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const audioRef = useRef(null);
  const chevronRef = useRef(null);
  const messageRef = useRef(null);
  const galleryRef = useRef(null);
  const closingRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const {
    toName,
    fromName,
    message,
    photos,
    music,
    timeline,
    wishes,
    quote,
    surpriseLabel,
    surpriseMessage,
  } = birthdayData;

  const initial = toName?.charAt(0)?.toUpperCase() || "?";

  // ── Unfold animation (Anime.js) ──────────────────────────────
  useEffect(() => {
    if (stage !== "opening") return;

    anime
      .timeline({ easing: "easeOutExpo" })
      .add({
        targets: ".ll-fold-1",
        rotateX: [-100, 0],
        opacity: [0, 1],
        duration: 450,
      })
      .add(
        {
          targets: ".ll-fold-2",
          rotateX: [-100, 0],
          opacity: [0, 1],
          duration: 450,
        },
        "-=280",
      )
      .add(
        {
          targets: ".ll-fold-3",
          rotateX: [-100, 0],
          opacity: [0, 1],
          duration: 450,
        },
        "-=280",
      )
      .add({
        targets: ".ll-unfold-paper",
        scale: [1, 1.15],
        duration: 280,
        easing: "easeOutQuad",
      })
      .add({
        targets: ".ll-unfold-overlay",
        opacity: [1, 0],
        duration: 400,
        easing: "easeInQuad",
        complete: () => {
          setStage("opened");
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 1400);
        },
      });
  }, [stage]);

  // ── Chevron bounce (Anime.js) ─────────────────────────────────
  useEffect(() => {
    if (stage !== "opened" || !chevronRef.current) return;
    const anim = anime({
      targets: chevronRef.current,
      translateY: [0, 10],
      opacity: [1, 0.4],
      direction: "alternate",
      loop: true,
      duration: 900,
      easing: "easeInOutSine",
    });
    return () => anim.pause();
  }, [stage]);

  // ── Scroll-reveal (Anime.js) ──────────────────────────────────
  useEffect(() => {
    if (stage !== "opened") return;

    const reveal = (entries, obs, fn) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          fn();
          obs.unobserve(e.target);
        }
      });
    };

    const msgObs = new IntersectionObserver(
      (e, o) =>
        reveal(e, o, () =>
          anime({
            targets: ".ll-message-line",
            translateY: [30, 0],
            opacity: [0, 1],
            delay: anime.stagger(180),
            duration: 700,
            easing: "easeOutExpo",
          }),
        ),
      { threshold: 0.4 },
    );

    const galObs = new IntersectionObserver(
      (e, o) =>
        reveal(e, o, () =>
          anime({
            targets: ".ll-photo-card",
            scale: [0.8, 1],
            rotate: (el) => [0, el.dataset.rot],
            opacity: [0, 1],
            delay: anime.stagger(150),
            duration: 700,
            easing: "easeOutBack",
          }),
        ),
      { threshold: 0.25 },
    );

    const clsObs = new IntersectionObserver(
      (e, o) =>
        reveal(e, o, () => {
          anime({
            targets: ".ll-closing-content",
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 700,
            easing: "easeOutExpo",
          });
          anime({
            targets: ".ll-closing-heart",
            scale: [1, 1.25],
            direction: "alternate",
            loop: true,
            duration: 800,
            easing: "easeInOutSine",
          });
        }),
      { threshold: 0.4 },
    );

    if (messageRef.current) msgObs.observe(messageRef.current);
    if (galleryRef.current) galObs.observe(galleryRef.current);
    if (closingRef.current) clsObs.observe(closingRef.current);

    return () => {
      msgObs.disconnect();
      galObs.disconnect();
      clsObs.disconnect();
    };
  }, [stage]);

  const handleOpen = useCallback(() => {
    setStage("opening");
    if (music && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [music]);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setIsPlaying((p) => !p);
  }, [isPlaying]);

  const handleSurprise = () => {
    setSurpriseOpened(true);
  };

  // Komponen badge reusable — taruh di atas komponen utama
  function SectionBadge({ icon: Icon, children }) {
    return (
      <div className="ll-hero-badge">
        {Icon && <Icon size={14} strokeWidth={2.5} className="ll-badge-icon" />}
        {children}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════════
  return (
    <div className="ll-root">
      <motion.div
        className="ll-progress"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      {music && <audio ref={audioRef} src={music} loop />}

      {/* ── ENVELOPE (closed) ─────────────────────────────────── */}
      <AnimatePresence>
        {stage === "closed" && (
          <motion.div
            key="envelope"
            className="ll-envelope-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div className="ll-blob ll-blob-1" {...floating} />
            <motion.div
              className="ll-blob ll-blob-2"
              animate={{
                y: [0, -12, 0],
                rotate: [1, -1, 1],
                transition: {
                  repeat: Infinity,
                  duration: 4.5,
                  ease: "easeInOut",
                  delay: 1.5,
                },
              }}
            />
            <motion.div
              className="ll-blob ll-blob-3"
              animate={{
                y: [0, -10, 0],
                rotate: [-2, 2, -2],
                transition: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  delay: 3,
                },
              }}
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="ll-envelope-inner"
            >
              <motion.p className="ll-envelope-label" variants={fadeUp}>
                Untuk {toName}
              </motion.p>
              <motion.div className="ll-envelope-box" variants={scaleIn}>
                <div className="ll-envelope-body" />
                <div className="ll-envelope-flap" />
                <div className="ll-washi-tape" />
                <div className="ll-envelope-badge">
                  <span>{initial}</span>
                </div>
              </motion.div>
              <motion.button
                onClick={handleOpen}
                className="ll-envelope-button"
                variants={fadeUp}
                whileHover={{
                  scale: 1.06,
                  y: -2,
                  boxShadow: "6px 6px 0 #221b3a",
                }}
                whileTap={{ scale: 0.96 }}
              >
                <span>Buka Surat ✉️</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── UNFOLD OVERLAY (opening) ───────────────────────────── */}
      {stage === "opening" && (
        <div className="ll-unfold-overlay">
          <div className="ll-unfold-paper">
            <div className="ll-fold-panel ll-fold-1" />
            <div className="ll-fold-panel ll-fold-2" />
            <div className="ll-fold-panel ll-fold-3" />
          </div>
        </div>
      )}

      {/* ── SCROLL PAGE (opened) ──────────────────────────────── */}
      <AnimatePresence>
        {stage === "opened" && (
          <motion.div
            key="scroll-page"
            className="ll-scroll-container"
            variants={cardEntrance}
            initial="hidden"
            animate="show"
          >
            <motion.div className="ll-blob ll-blob-1" {...floating} />
            <motion.div
              className="ll-blob ll-blob-2"
              animate={{
                y: [0, -12, 0],
                rotate: [1, -1, 1],
                transition: {
                  repeat: Infinity,
                  duration: 4.5,
                  ease: "easeInOut",
                  delay: 1.5,
                },
              }}
            />
            <motion.div
              className="ll-blob ll-blob-3"
              animate={{
                y: [0, -10, 0],
                rotate: [-2, 2, -2],
                transition: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  delay: 3,
                },
              }}
            />

            {/* ── 1. HERO ─────────────────────────────────────── */}
            <section className="ll-section ll-hero">
              {showConfetti && <ConfettiBurst />}

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="ll-hero-inner"
              >
                <SectionBadge icon={Cake}>Selamat Ulang Tahun</SectionBadge>
                <motion.h1 className="ll-hero-title" variants={fadeIn}>
                  <LetterReveal text={toName} />
                </motion.h1>

                <motion.div
                  className="ll-hero-hearts"
                  variants={fadeUp}
                  aria-hidden="true"
                >
                  {[Heart, Sparkles, Star, Sparkles, Heart].map((Icon, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        y: [0, -6, 0],
                        transition: {
                          repeat: Infinity,
                          duration: 2 + i * 0.3,
                          ease: "easeInOut",
                          delay: i * 0.2,
                        },
                      }}
                    >
                      <Icon
                        size={18}
                        className="ll-hero-deco-icon"
                        strokeWidth={2}
                      />
                    </motion.span>
                  ))}
                </motion.div>
                <motion.p className="ll-hero-sub" variants={fadeUp}>
                  gulir ke bawah buat baca suratnya ✦
                </motion.p>
              </motion.div>

              <ChevronDown ref={chevronRef} className="ll-hero-chevron" />
            </section>

            {/* ── 2. TIMELINE ─────────────────────────────────── */}
            {timeline?.length > 0 && (
              <section className="ll-section ll-timeline-section">
                <SectionBadge icon={Calendar}>Perjalanan Kita</SectionBadge>

                <div className="ll-timeline">
                  <div className="ll-timeline-line" aria-hidden="true" />
                  {timeline.map((item, i) => (
                    <motion.div
                      key={i}
                      className={`ll-timeline-item ${i % 2 === 0 ? "ll-tl-left" : "ll-tl-right"}`}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      {(() => {
                        const Icon = TIMELINE_ICONS[i] ?? Clock;
                        return (
                          <div className="ll-timeline-dot">
                            <Icon size={16} strokeWidth={2.5} />
                          </div>
                        );
                      })()}
                      <div className="ll-timeline-card">
                        <span className="ll-timeline-date">{item.date}</span>
                        <p className="ll-timeline-label">{item.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* ── 3. PESAN ────────────────────────────────────── */}
            <section ref={messageRef} className="ll-section ll-message">
              <SectionBadge icon={Mail}>Surat Untukmu</SectionBadge>
              <div className="ll-message-card">
                <div className="ll-message-deco" aria-hidden="true">
                  ✦
                </div>
                {message.map((p, i) => (
                  <p key={i} className="ll-message-line">
                    {p}
                  </p>
                ))}
                <div
                  className="ll-message-deco ll-message-deco-bottom"
                  aria-hidden="true"
                >
                  ✦
                </div>
              </div>
            </section>

            {/* ── 4. WISHES ───────────────────────────────────── */}
            {wishes?.length > 0 && (
              <section className="ll-section ll-wishes-section">
                <SectionBadge icon={Star}>Harapan Untukmu</SectionBadge>

                <div className="ll-wishes-grid">
                  {wishes.map((w, i) => (
                    <motion.div
                      key={i}
                      className="ll-wish-card"
                      initial={{ opacity: 0, y: 30, scale: 0.92 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      whileHover={{ y: -4, boxShadow: "6px 10px 0 #221b3a" }}
                    >
                      {(() => {
                        const Icon = WISH_ICONS[i] ?? Star;
                        return (
                          <Icon
                            size={20}
                            strokeWidth={2}
                            className="ll-wish-icon"
                          />
                        );
                      })()}
                      <p className="ll-wish-text">{w.text}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* ── 5. GALERI ───────────────────────────────────── */}
            {photos?.length > 0 && (
              <section ref={galleryRef} className="ll-section ll-gallery">
                {/* PASTIKAN MENGGUNAKAN icon={Image} BUKAN ImageIcon */}
                <SectionBadge icon={Image}>Kenangan Kita</SectionBadge>
                <div className="ll-gallery-grid">
                  {photos.map((src, i) => (
                    <div
                      key={src}
                      className="ll-photo-card"
                      data-rot={i % 2 === 0 ? -4 : 4}
                      style={{ "--rot": `${i % 2 === 0 ? -4 : 4}deg` }}
                    >
                      <div className="ll-photo-tape" />
                      <img src={src} alt={`Kenangan ${i + 1}`} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── 6. QUOTE ────────────────────────────────────── */}
            {quote && (
              <section className="ll-section ll-quote-section">
                <motion.div
                  className="ll-quote-wrap"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  <span
                    className="ll-quote-mark ll-quote-open"
                    aria-hidden="true"
                  >
                    "
                  </span>
                  <p className="ll-quote-text">{quote.text}</p>
                  <span
                    className="ll-quote-mark ll-quote-close"
                    aria-hidden="true"
                  >
                    "
                  </span>
                  <p className="ll-quote-author">{quote.author}</p>
                </motion.div>
              </section>
            )}

            {/* ── 7. PENUTUP + SURPRISE ───────────────────────── */}
            <section ref={closingRef} className="ll-section ll-closing">
              <div className="ll-closing-content">
                <Heart className="ll-closing-heart" />
                <p className="ll-closing-text">
                  Selamat ulang tahun, sayangku.
                </p>
                <p className="ll-closing-signature">— {fromName}</p>

                <AnimatePresence mode="wait">
                  {!surpriseOpened ? (
                    <motion.button
                      key="surprise-btn"
                      className="ll-surprise-btn"
                      onClick={handleSurprise}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{
                        scale: 1.07,
                        y: -2,
                        boxShadow: "6px 6px 0 #221b3a",
                      }}
                      whileTap={{ scale: 0.94 }}
                    >
                      <Gift className="ll-surprise-icon" aria-hidden="true" />
                      <span>{surpriseLabel}</span>
                    </motion.button>
                  ) : (
                    <motion.div
                      key="surprise-msg"
                      className="ll-surprise-message"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <Sparkles
                        className="ll-surprise-sparkle"
                        aria-hidden="true"
                      />
                      <p>{surpriseMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* Music toggle */}
            {music && (
              <motion.button
                onClick={toggleMusic}
                className="ll-music-toggle"
                whileHover={{ scale: 1.1, y: -1 }}
                whileTap={{ scale: 0.93 }}
                aria-label={isPlaying ? "Matikan musik" : "Nyalakan musik"}
              >
                {isPlaying ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
