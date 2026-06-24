import { motion } from 'framer-motion';

const shots = [
  { src: 'images/note-view.webp', alt: 'A markdown travel-journal note with an image and a table', rot: -6, x: 0, y: 0, z: 2 },
  { src: 'images/code-view.webp', alt: 'A note rendering Java, Python and SQL code blocks', rot: 7, x: 150, y: 40, z: 1 },
];

const points = [
  '📝 Live markdown as you type',
  '📌 Always on top of everything',
  '🖼️ Paste images, theme, drag freely',
  '⚡ Tiny & fast — under 4 MB',
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 16 } },
};

export default function Hero() {
  return (
    <motion.div className="hero-grid" variants={container} initial="hidden" animate="show">
      <div className="hero-copy">
        <motion.span className="eyebrow" variants={fadeUp}>Product · Windows</motion.span>
        <motion.h1 className="hero-title" variants={fadeUp}>
          The note app that <span className="hl">actually sticks</span> — on your mind, and on top of every app.
        </motion.h1>
        <motion.p className="hero-sub" variants={fadeUp}>
          on my mind pins fully dynamic markdown notes above everything on your screen.
        </motion.p>
        <motion.ul className="hero-slabs" variants={fadeUp}>
          {points.map((p) => (
            <li key={p} className="slab">{p}</li>
          ))}
        </motion.ul>
        <motion.div className="hero-cta" variants={fadeUp}>
          <a className="btn btn-primary" href="#download">↓ Download free</a>
          <a className="btn btn-ghost" href="#features">See features</a>
        </motion.div>
      </div>

      <div className="hero-stage">
        {shots.map((s, i) => (
          <motion.figure
            key={s.src}
            className="float-shot"
            style={{ left: s.x, top: s.y, rotate: `${s.rot}deg`, zIndex: s.z }}
            variants={fadeUp}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 5 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ y: { repeat: Infinity, duration: 3 + i * 0.4, ease: 'easeInOut' } }}
          >
            <span className="float-pin" />
            <img src={`${import.meta.env.BASE_URL}${s.src}`} alt={s.alt} loading="eager" />
          </motion.figure>
        ))}
      </div>
    </motion.div>
  );
}
