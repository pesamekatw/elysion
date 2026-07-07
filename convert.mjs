import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = './src/assets';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

async function convert() {
  console.log(`Found ${files.length} PNG files. Converting to WebP...`);
  for (const file of files) {
    const input = path.join(dir, file);
    const output = path.join(dir, file.replace('.png', '.webp'));
    console.log(`Converting ${file}...`);
    try {
      await sharp(input).webp({ quality: 80 }).toFile(output);
      fs.unlinkSync(input);
      console.log(`Successfully converted and removed ${file}`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }
  console.log('Conversion complete!');
}

convert();
