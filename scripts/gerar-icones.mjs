import fs from "node:fs";
import sharp from "sharp";
// Uso (a partir de site/): node scripts/gerar-icones.mjs <pasta-temporaria>
// Gera app/icon.svg, app/apple-icon.png, public/icon-192.png, public/icon-512.png e um PNG 256 para o favicon.ico.
const SP = process.argv[2];
const mono = fs.readFileSync("public/logo/monograma-fundo-escuro.svg", "utf8");
// ícone: quadrado marinho com cantos arredondados + monograma (svg aninhado)
const inner = mono.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
const icon = (pad = 0) => {
  const size = 640, w = 330, h = Math.round(330 * 647.36 / 552.04);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${pad ? 0 : 130}" fill="#0f293f"/><svg x="${(size - w) / 2}" y="${(size - h) / 2}" width="${w}" height="${h}" viewBox="0 0 552.04 647.36">${inner}</svg></svg>`;
};
fs.writeFileSync("app/icon.svg", icon());
const svg = Buffer.from(icon());
await sharp(svg).resize(512, 512).png().toFile("public/icon-512.png");
await sharp(svg).resize(192, 192).png().toFile("public/icon-192.png");
// apple-touch-icon não deve ter cantos transparentes
await sharp(Buffer.from(icon(1))).resize(180, 180).png().toFile("app/apple-icon.png");
await sharp(Buffer.from(icon(1))).resize(256, 256).png().toFile(SP + "/favicon-256.png");
// logo horizontal (fundo escuro) rasterizado para compor a OG
await sharp("public/logo/logo-horizontal-fundo-escuro.svg", { density: 300 }).resize({ width: 420 }).png().toFile(SP + "/logo-h.png");
console.log("ok");
