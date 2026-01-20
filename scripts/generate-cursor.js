const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create a high-res canvas (128x128 for crisp rendering)
const size = 128;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// Scale factor (original viewBox is 24x24)
const scale = size / 24;

// Clear with transparency
ctx.clearRect(0, 0, size, size);

// Set up stroke style
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 1.5 * scale;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// Draw the outer circle
ctx.beginPath();
ctx.arc(12 * scale, 12 * scale, 9 * scale, 0, Math.PI * 2);
ctx.stroke();

// Draw the left curve (M6 5.3a9 9 0 0 1 0 13.4)
ctx.beginPath();
ctx.arc(6 * scale, 12 * scale, 6.7 * scale, -Math.PI * 0.5 - 0.52, Math.PI * 0.5 + 0.52);
ctx.stroke();

// Draw the right curve (M18 5.3a9 9 0 0 0 0 13.4)
ctx.beginPath();
ctx.arc(18 * scale, 12 * scale, 6.7 * scale, Math.PI * 0.5 - 0.52, -Math.PI * 0.5 + 0.52);
ctx.stroke();

// Save as PNG
const outputPath = path.join(__dirname, '..', 'public', 'cursor-ball.png');
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(outputPath, buffer);

console.log('Cursor PNG saved to:', outputPath);
