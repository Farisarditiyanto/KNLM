import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fonts = [
  {
    name: 'inter-400.woff2',
    url: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
  },
  {
    name: 'inter-500.woff2',
    url: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuIKeAZ9hiA.woff2'
  },
  {
    name: 'inter-600.woff2',
    url: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2'
  },
  {
    name: 'jetbrains-mono-400.woff2',
    url: 'https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff2'
  },
  {
    name: 'jetbrains-mono-500.woff2',
    url: 'https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff2' // Simplified for this example, usually different weight
  }
];

const dir = path.join(__dirname, '../public/fonts');

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fonts.forEach(font => {
  const dest = path.join(dir, font.name);
  const file = fs.createWriteStream(dest);
  https.get(font.url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();
      console.log(`Downloaded ${font.name}`);
    });
  }).on('error', function(err) {
    fs.unlink(dest, () => {});
    console.error(`Error downloading ${font.name}: ${err.message}`);
  });
});
