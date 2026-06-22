import { motion } from 'framer-motion';

const notes = [
  { text: 'Buy milk 🥛', color: '#ffe16b', rot: -8, x: -20, y: 10 },
  { text: '## Ship v1\n- [x] build\n- [ ] sign', color: '#8ff0c5', rot: 6, x: 130, y: -30 },
  { text: 'call mom ❤️', color: '#ff8fb1', rot: -3, x: 60, y: 120 },
  { text: 'idea: portfolio site', color: '#8fb8ff', rot: 9, x: 220, y: 80 },
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
        <motion.span className="eyebrow" variants={fadeUp}>Product · Windows &amp; macOS</motion.span>
        <motion.h1 className="hero-title" variants={fadeUp}>
          Sticky notes that stay <span className="hl">on your mind</span> — and on top of every app.
        </motion.h1>
        <motion.p className="hero-sub" variants={fadeUp}>
          StickyNote pins markdown notes above everything on your screen. Jot, check off,
          paste images, theme them — they never get buried under a window again.
        </motion.p>
        <motion.div className="hero-cta" variants={fadeUp}>
          <a className="btn btn-primary" href="#download">↓ Download free</a>
          <a className="btn btn-ghost" href="#features">See features</a>
        </motion.div>
      </div>

      <div className="hero-stage" aria-hidden="true">
        {notes.map((n, i) => (
          <motion.div
            key={i}
            className="float-note"
            style={{ background: n.color, left: n.x, top: n.y, rotate: `${n.rot}deg` }}
            variants={fadeUp}
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 5 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ y: { repeat: Infinity, duration: 3 + i * 0.4, ease: 'easeInOut' } }}
          >
            <span className="float-pin" />
            <pre>{n.text}</pre>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
