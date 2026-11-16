const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
 * Packs multiple PNG buffers into a single standard Windows ICO file buffer
 */
function createIco(images) {
  const count = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO type
  header.writeUInt16LE(count, 4); // Number of images

  const dirEntries = [];
  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0); // Width
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Image size in bytes
    entry.writeUInt32LE(offset, 12); // File offset to image data
    dirEntries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...images.map((img) => img.buffer)]);
}

async function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  const appIconSvgPath = path.join(publicDir, 'alphacodes-app-icon.svg');
  const appIconSvg = fs.readFileSync(appIconSvgPath, 'utf8');

  // 1. Copy app icon to icon.svg
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), appIconSvg);
  console.log('Copied alphacodes-app-icon.svg -> icon.svg');

  // 2. Generate icon.png (512x512)
  await sharp(Buffer.from(appIconSvg))
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'icon.png'));
  console.log('Generated icon.png (512x512)');

  // 3. Generate apple-touch-icon.png (180x180)
  await sharp(Buffer.from(appIconSvg))
    .resize(180, 180)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png (180x180)');

  // 4. Generate multi-resolution favicon.ico (16, 32, 48 px)
  const [png16, png32, png48] = await Promise.all([
    sharp(Buffer.from(appIconSvg)).resize(16, 16).png().toBuffer(),
    sharp(Buffer.from(appIconSvg)).resize(32, 32).png().toBuffer(),
    sharp(Buffer.from(appIconSvg)).resize(48, 48).png().toBuffer(),
  ]);

  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Generated favicon.ico (16, 32, 48 px)');

  // 5. Generate og-image.svg & og-image.png (1200x630)
  // Read alphacodes-logo-horizontal-dark.svg for vector inclusion
  const logoSvgPath = path.join(publicDir, 'alphacodes-logo-horizontal-dark.svg');
  let logoContent = fs.readFileSync(logoSvgPath, 'utf8');
  // Strip outer <svg ...> and </svg> to embed inside a <g>
  logoContent = logoContent.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');

  const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1B2B" />
      <stop offset="100%" stop-color="#06121E" />
    </linearGradient>
    <linearGradient id="cyanBlue" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#12A9EC" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>
    <radialGradient id="cyanOrb" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#12A9EC" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#12A9EC" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Deep Navy Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />

  <!-- Cyan Ambient Glow -->
  <circle cx="920" cy="220" r="460" fill="url(#cyanOrb)" />
  <circle cx="200" cy="500" r="380" fill="url(#cyanOrb)" />

  <!-- Tech Grid Lines -->
  <g opacity="0.07" stroke="#FFFFFF" stroke-width="1">
    <line x1="0" y1="90" x2="1200" y2="90" />
    <line x1="0" y1="180" x2="1200" y2="180" />
    <line x1="0" y1="270" x2="1200" y2="270" />
    <line x1="0" y1="360" x2="1200" y2="360" />
    <line x1="0" y1="450" x2="1200" y2="450" />
    <line x1="0" y1="540" x2="1200" y2="540" />
    <line x1="120" y1="0" x2="120" y2="630" />
    <line x1="240" y1="0" x2="240" y2="630" />
    <line x1="360" y1="0" x2="360" y2="630" />
    <line x1="480" y1="0" x2="480" y2="630" />
    <line x1="600" y1="0" x2="600" y2="630" />
    <line x1="720" y1="0" x2="720" y2="630" />
    <line x1="840" y1="0" x2="840" y2="630" />
    <line x1="960" y1="0" x2="960" y2="630" />
    <line x1="1080" y1="0" x2="1080" y2="630" />
  </g>

  <!-- Top Brand Logo -->
  <g transform="translate(100, 75) scale(0.32)">
    ${logoContent}
  </g>

  <!-- Studio Eyebrow Tag -->
  <g transform="translate(100, 185)">
    <rect x="0" y="0" width="230" height="30" rx="15" fill="#12A9EC" fill-opacity="0.14" stroke="#12A9EC" stroke-opacity="0.35" />
    <circle cx="16" cy="15" r="4" fill="#12A9EC" />
    <text x="30" y="20" fill="#38BDF8" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="11" letter-spacing="1.5">DIGITAL PRODUCT STUDIO</text>
  </g>

  <!-- Headline -->
  <text x="100" y="285" fill="#FFFFFF" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="60" letter-spacing="-1.5">
    Build &amp; Develop own &amp;
  </text>
  <text x="100" y="355" fill="url(#cyanBlue)" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="60" letter-spacing="-1.5">
    custom products.
  </text>

  <!-- Subtitle Line -->
  <text x="100" y="425" fill="#94A3B8" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="500" font-size="24">
    Software studio of <tspan fill="#FFFFFF" font-weight="700">THAAYAKAM LTD</tspan> — from first MVP to production scale.
  </text>

  <!-- Discipline Chips -->
  <g transform="translate(100, 480)">
    <rect x="0" y="0" width="180" height="36" rx="18" fill="#11253E" stroke="#1E3E66" />
    <text x="90" y="23" fill="#E2E8F0" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="12" text-anchor="middle" letter-spacing="1">PRODUCT ENGINEERING</text>

    <rect x="195" y="0" width="190" height="36" rx="18" fill="#11253E" stroke="#1E3E66" />
    <text x="290" y="23" fill="#E2E8F0" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="12" text-anchor="middle" letter-spacing="1">WEBSITE DEVELOPMENT</text>

    <rect x="400" y="0" width="160" height="36" rx="18" fill="#11253E" stroke="#1E3E66" />
    <text x="480" y="23" fill="#E2E8F0" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="12" text-anchor="middle" letter-spacing="1">CLOUD OPERATIONS</text>

    <rect x="575" y="0" width="170" height="36" rx="18" fill="#11253E" stroke="#1E3E66" />
    <text x="660" y="23" fill="#E2E8F0" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="12" text-anchor="middle" letter-spacing="1">DIGITAL PRODUCT DESIGN</text>
  </g>

  <!-- Bottom Coordinates Bar -->
  <g transform="translate(100, 565)">
    <line x1="0" y1="0" x2="1000" y2="0" stroke="#1E344F" stroke-width="1" />
    <text x="0" y="25" fill="#12A9EC" font-family="monospace" font-weight="700" font-size="15" letter-spacing="1">www.alphacodes.online</text>
    <text x="1000" y="25" fill="#64748B" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" text-anchor="end">SRI LANKA &#8226; UNITED KINGDOM</text>
  </g>
</svg>`;

  fs.writeFileSync(path.join(publicDir, 'og-image.svg'), ogSvg);
  console.log('Generated og-image.svg (1200x630)');

  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png({ quality: 95 })
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('Generated og-image.png (1200x630)');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
