import { motion } from 'framer-motion';

const features = [
  { icon: '📌', title: 'Always on top', body: 'Notes float above every window — the note that actually sticks to your screen.' },
  { icon: '✍️', title: 'Markdown editor', body: 'CodeMirror-powered editing with live markdown, checklists and syntax highlighting.' },
  { icon: '🖼️', title: 'Paste & resize images', body: 'Drop or paste images straight into a note and resize them inline.' },
  { icon: '🎨', title: 'Colors & themes', body: 'Classic sticky-note palette with a warm yellow default — pick a vibe per note.' },
  { icon: '🔤', title: 'Font settings', body: 'Tune the typeface and sizing so your notes read exactly how you like.' },
  { icon: '⚡', title: 'Global shortcuts', body: 'Spawn a fresh note instantly from anywhere with a keyboard shortcut.' },
  { icon: '🏠', title: 'Notes manager', body: 'A home view to browse, organize and relaunch every note you’ve made.' },
  { icon: '🚀', title: 'Autostart & autosave', body: 'Launches with Windows and debounced-saves as you type — nothing is lost.' },
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
