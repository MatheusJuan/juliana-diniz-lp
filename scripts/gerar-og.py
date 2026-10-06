"""Gera public/og.jpg (1200x630) a partir de public/images/hero-desktop.webp.

Uso (a partir de site/): python scripts/gerar-og.py
Requer: pip install pillow. Baixa as fontes da marca (Google Fonts, licença OFL) para uma pasta temporária.
Rode de novo sempre que trocar a foto do hero ou o título.
"""
import os, tempfile, urllib.request
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
NAVY, SAGE300 = (15, 41, 63), (169, 189, 175)
FONTS = {
    "Goudy.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/sortsmillgoudy/SortsMillGoudy-Regular.ttf",
    "Montserrat.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/montserrat/Montserrat%5Bwght%5D.ttf",
}
tmp = os.path.join(tempfile.gettempdir(), "juliana-diniz-fonts")
os.makedirs(tmp, exist_ok=True)
for name, url in FONTS.items():
    path = os.path.join(tmp, name)
    if not os.path.exists(path):
        urllib.request.urlretrieve(url, path)

bg = Image.new("RGB", (W, H), NAVY)
hero = Image.open("public/images/hero-desktop.webp").convert("RGB")
s = H / hero.height
hero = hero.resize((int(hero.width * s), H), Image.LANCZOS)
bg.paste(hero, (W - hero.width + 60, 0))

grad = Image.new("L", (W, 1))
for i in range(W):
    t = min(max((i - 380) / 520, 0), 1)
    grad.putpixel((i, 0), int(255 * (1 - t) ** 1.2))
bg = Image.composite(Image.new("RGB", (W, H), NAVY), bg, grad.resize((W, H)))

d = ImageDraw.Draw(bg)
logo = Image.open("scripts/assets/logo-horizontal-escuro.png").convert("RGBA")  # SVG oficial rasterizado (420 px)
bg.paste(logo, (64, 56), logo)
mont = ImageFont.truetype(os.path.join(tmp, "Montserrat.ttf"), 20)
mont.set_variation_by_axes([500])
goudy = ImageFont.truetype(os.path.join(tmp, "Goudy.ttf"), 70)
d.text((64, 214), "CONSULTORIA EM SUSTENTABILIDADE E ESG", font=mont, fill=(220, 226, 222))
y = 262
for line in [[("ESG que sai do", 0)], [("papel e entra na", 0)], [("estratégia do seu", 1)], [("negócio.", 0)]]:
    x = 64
    for text, hl in line:
        d.text((x, y), text, font=goudy, fill=SAGE300 if hl else (252, 253, 253))
        x += d.textlength(text + " ", font=goudy)
    y += 74
d.text((64, H - 52), "julianadinizesg.com.br", font=mont, fill=SAGE300)
bg.save("public/og.jpg", quality=88, optimize=True, progressive=True)
print("public/og.jpg gerado")
