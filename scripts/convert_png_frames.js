const path = require('path');
const fs = require('fs');
const sharp = require(path.join(__dirname, '..', 'node_modules', 'sharp'));

const srcDir = path.join(__dirname, '..', 'Snack_jars_falling_and_stacking_20260910153646_gwr_video_mvp_frames');
const outDir = path.join(__dirname, '..', 'public', 'hero-frames');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Clean old frames from outDir
const oldFiles = fs.readdirSync(outDir);
for (const file of oldFiles) {
  if (file.endsWith('.webp')) {
    try {
      fs.unlinkSync(path.join(outDir, file));
    } catch (_) {}
  }
}

async function convertPngFrames() {
  console.log('Converting 50 High-Quality PNG frames to Full HD (1920x1080) WebP Q96...');
  const startTime = Date.now();
  let totalBytes = 0;

  for (let i = 1; i <= 50; i++) {
    const srcName = `frame_${String(i).padStart(3, '0')}.png`;
    const outName = `frame_${String(i).padStart(4, '0')}.webp`;
    const srcPath = path.join(srcDir, srcName);
    const outPath = path.join(outDir, outName);

    const info = await sharp(srcPath)
      .resize(1920, 1080, {
        kernel: sharp.kernel.lanczos3,
        fastShrinkOnLoad: false,
      })
      .sharpen({
        sigma: 1.2,
        m1: 1.0,
        m2: 2.5,
      })
      .webp({
        quality: 88,
        effort: 5,
        smartSubsample: false,
      })
      .toFile(outPath);

    totalBytes += info.size;
    process.stdout.write(`Converted frame ${i} / 50 (${(info.size / 1024).toFixed(1)} KB)\r`);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);
  const avgKB = (totalBytes / 50 / 1024).toFixed(1);
  console.log(`\nConversion complete!`);
  console.log(`Total 50 Full HD frames: ${totalMB} MB (Average ${avgKB} KB/frame) in ${elapsed}s`);
}

convertPngFrames().catch((err) => {
  console.error('Conversion failed:', err);
  process.exit(1);
});
