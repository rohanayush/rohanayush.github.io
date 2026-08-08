import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Artifact = { file: string; size: string };
type Manifest = {
  version?: string;
  builtAt?: string;
  installer?: Artifact;
  msi?: Artifact;
  portable?: Artifact;
};

// Defaults match what scripts/publish-artifacts.ps1 copies into public/downloads.
const REL = 'https://github.com/rohanayush/release-on-my-mind-note/releases/download/mind-note';
const FALLBACK: Manifest = {
  version: '0.1.0',
  installer: { file: `${REL}/StickyNote-Setup.exe`, size: '3.9 MB' },
  msi: { file: `${REL}/StickyNote.msi`, size: '5.4 MB' },
  portable: { file: `${REL}/StickyNote-Portable.exe`, size: '14.9 MB' },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
};

export default function Download() {
  const [m, setM] = useState<Manifest>(FALLBACK);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}downloads/manifest.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Manifest) => setM({ ...FALLBACK, ...data }))
      .catch(() => {/* keep fallback */});
  }, []);

  const href = (a?: Artifact) =>
    a?.file && /^https?:\/\//.test(a.file)
      ? a.file // absolute URL (e.g. a GitHub Releases asset)
      : `${import.meta.env.BASE_URL}downloads/${a?.file ?? ''}`;
  const sz = (a?: Artifact) => (a?.size ? ` · ${a.size}` : '');

  return (
    <div className="dl-wrap">
      <motion.div
        className="dl-card"
        variants={card}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        whileHover={{ y: -6 }}
      >
        <h3>Installer</h3>
        <p>One-click setup with Start-menu shortcut &amp; auto-update of the WebView runtime.</p>
        <a className="btn btn-primary" href={href(m.installer)} download>
          ↓ Download Setup{sz(m.installer)}
        </a>
        <small>Windows · .exe (NSIS)</small>
      </motion.div>

      <motion.div className="dl-card" variants={card} initial="hidden" whileInView="show" viewport={{ once: true }} whileHover={{ y: -6 }}>
        <h3>Portable</h3>
        <p>No install — just run the executable. Great for USB sticks &amp; locked-down PCs.</p>
        <a className="btn btn-primary" href={href(m.portable)} download>
          ↓ Download Portable{sz(m.portable)}
        </a>
        <small>Windows · standalone .exe</small>
      </motion.div>

      <motion.div className="dl-card" variants={card} initial="hidden" whileInView="show" viewport={{ once: true }} whileHover={{ y: -6 }}>
        <h3>MSI package</h3>
        <p>For managed/enterprise deployment via Group Policy or Intune.</p>
        <a className="btn btn-primary" href={href(m.msi)} download>
          ↓ Download MSI{sz(m.msi)}
        </a>
        <small>Windows · .msi</small>
      </motion.div>

      <p className="dl-meta">
        Version {m.version}{m.builtAt ? ` · built ${m.builtAt}` : ''}. Unsigned build —
        Windows SmartScreen may warn; click <em>More info → Run anyway</em>.
      </p>
    </div>
  );
}
