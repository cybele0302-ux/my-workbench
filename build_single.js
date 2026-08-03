// Build single-file 个人工作台.html by inlining CSS+JS into index.html
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const outPath = path.join(dir, '..', '个人工作台.html');

let html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(dir, 'style.css'), 'utf8');
const js  = fs.readFileSync(path.join(dir, 'app.js'),  'utf8');

// Inline CSS: replace <link rel="stylesheet" href="style.css"> with <style>...</style>
html = html.replace(
  /<link\s+rel="stylesheet"\s+href="style\.css"\s*>/g,
  '<style>\n' + css + '\n</style>'
);

// Remove manifest link (not available in single-file mode)
html = html.replace(
  /<link\s+rel="manifest"\s+href="manifest\.json"\s*>/g,
  ''
);

// Inline JS: replace <script src="app.js"></script> with <script>...</script>
html = html.replace(
  /<script\s+src="app\.js"\s*><\/script>/g,
  '<script>\n' + js + '\n</script>'
);

// Write single file
fs.writeFileSync(outPath, html, 'utf8');
console.log('Single file built:', outPath);
console.log('Size:', (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1) + ' KB');
