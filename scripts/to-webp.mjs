import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const dir = 'public/images';
const files = (await readdir(dir)).filter(f => f.endsWith('.png'));
for (const f of files) {
  const src = path.join(dir, f);
  const out = path.join(dir, f.replace(/\.png$/, '.webp'));
  // home.png is a wide full-screen shot; cap width for the web
  const resize = f === 'home.png' ? { width: 1600, withoutEnlargement: true } : {};
  await sharp(src).resize(resize).webp({ quality: 82 }).toFile(out);
  const before = (await stat(src)).size, after = (await stat(out)).size;
  console.log(`${f} -> ${path.basename(out)}  ${(before/1024).toFixed(0)}KB -> ${(after/1024).toFixed(0)}KB`);
}
