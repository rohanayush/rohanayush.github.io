import { motion } from 'framer-motion';

const features = [
  { icon: '📌', title: 'Always on top', body: 'Pin a note above every window — the one that actually sticks to your screen.' },
  { icon: '✍️', title: 'In-place markdown', body: 'Every block renders live as you type — headings, bold, links, code, tables — no preview pane, no mode switch.' },
  { icon: '🖼️', title: 'Paste & resize images', body: 'Drop or paste an image straight into a note, then drag a corner to resize it inline.' },
  { icon: '🎨', title: 'Colour any word', body: 'Spectrum wheel, exact hex code or recent swatches — colour runs of text, not just the whole note.' },
  { icon: '🔠', title: 'Font & size control', body: 'Set a base size per note, or size just the selection. The markup stays hidden while you edit.' },
  { icon: '📖', title: 'Read / book mode', body: 'Flip a note into a calm, read-only rendered view with a single tap.' },
  { icon: '⚡', title: 'Global new-note shortcut', body: 'Ctrl + Shift + N spawns a fresh note from anywhere — even when the app is hidden.' },
  { icon: '🏠', title: 'Notes manager', body: 'A chalkboard home to search, browse and relaunch every note you’ve made.' },
  { icon: '🔒', title: 'Pin, lock & fade', body: 'Lock a note in place, float it on top, or dial its opacity down to ghost-mode.' },
  { icon: '🌗', title: 'Themes & palette', body: 'Light, dark or system, with the classic six-colour sticky-note palette.' },
  { icon: '💾', title: 'Autostart & autosave', body: 'Launches with Windows and debounce-saves every keystroke — nothing is ever lost.' },
  { icon: '📦', title: 'Import / export', body: 'Back up or move your entire board as a single portable JSON file.' },
];

const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 130, damping: 18 } },
};

export default function Features() {
  return (
    <div className="feat-grid">
      {features.map((f) => (
        <motion.div
          key={f.title}
          className="feat-card"
          variants={card}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          whileHover={{ y: -6 }}
        >
          <div className="feat-icon">{f.icon}</div>
          <h3>{f.title}</h3>
          <p>{f.body}</p>
        </motion.div>
      ))}
    </div>
  );
}
