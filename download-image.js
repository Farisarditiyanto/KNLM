import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://i.postimg.cc/bYD95cp9/Whats_App_Image_2026_03_27_at_10_07_31.webp';
const dest = path.join(__dirname, 'public', 'qris.webp');

https.get(url, (res) => {
  const fileStream = fs.createWriteStream(dest);
  res.pipe(fileStream);
  fileStream.on('finish', () => {
    fileStream.close();
    console.log('QRIS image downloaded successfully.');
  });
}).on('error', (err) => {
  console.error('Error downloading image:', err.message);
});
