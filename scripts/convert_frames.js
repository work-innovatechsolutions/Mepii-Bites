const path = require('path');
const fs = require('fs');
const sharp = require(path.join(__dirname, '..', 'node_modules', 'sharp'));

const srcDir = path.join(__dirname, '..', 'meppi bites hero');
const outDir = path.join(__dirname, '..', 'public', 'hero-frames');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Clean up previous test sample files if any
const existingFiles = fs.readdirSync(outDir);
for (const file of existingFiles) {
  if (file.startsWith('sample_') || file.startsWith('test_')) {
    try {
      fs.unlinkSync(path.join(outDir, file));
    } catch (_) {}
  }
}

async function convertAll() {
  console.log('Converting all 300 frames to ULTRA-CRISP FULL HD 1080p (Lanczos3 + Crisp Unsharp Mask + Q95)...');
  const startTime = Date.now();
  let totalBytes = 0;

  const BATCH_SIZE = 10;
  for (let i = 1; i <= 300; i += BATCH_SIZE) {
    const promises = [];
    for (let j = i; j < i + BATCH_SIZE && j <= 300; j++) {
      const srcName = `ezgif-frame-${String(j).padStart(3, '0')}.jpg`;
      const outName = `frame_${String(j).padStart(4, '0')}.webp`;
      const srcPath = path.join(srcDir, srcName);
      const outPath = path.join(outDir, outName);

      promises.push(
        sharp(srcPath)
          .resize(1920, 1080, {
            kernel: sharp.kernel.lanczos3,
            fastShrinkOnLoad: false,
          })
          .sharpen({
            sigma: 1.6,
            m1: 1.5,
            m2: 4.0,
          })
          .webp({
            quality: 95,
            effort: 4,
            smartSubsample: false,
          })
          .toFile(outPath)
          .then((info) => {
            totalBytes += info.size;
          })
      );
    }
    await Promise.all(promises);
    process.stdout.write(`Processed up to frame ${Math.min(i + BATCH_SIZE - 1, 300)} / 300\r`);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);
  const avgKB = (totalBytes / 300 / 1024).toFixed(1);
  console.log(`\nUltra-Crisp Full HD 1080p conversion complete!`);
  console.log(`Total 300 frames: ${totalMB} MB (Average ${avgKB} KB/frame) in ${elapsed}s`);
}

convertAll().catch((err) => {
  console.error('Conversion failed:', err);
  process.exit(1);
});
