#!/usr/bin/env python3
"""Genera los iconos PWA (192, 512 y maskable-512) para Camino a la Primera Comunión.

Dibujo original: un cáliz dorado estilizado con la hostia sobre fondo crema.
No usa assets de terceros.
"""
import os
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "public", "icons")

CREAM = "#FDF6E9"
SKY = "#BFE3F7"
SKY_DARK = "#7FB8E4"
GOLD = "#D4A017"
GOLD_DARK = "#9C7210"
GOLD_LIGHT = "#F0CE6B"
WHITE = "#FFFFFF"

SIZE = 512


def draw_chalice(d: ImageDraw.ImageDraw, s: int, cx: int, cy: int) -> None:
    """Dibuja cáliz + hostia centrado en (cx, cy) con escala s (512 = base)."""
    k = s / 512.0

    def P(x: float, y: float):
        return (cx + x * k, cy + y * k)

    # Halo azul cielo
    d.ellipse([P(-160, -160), P(160, 160)], fill=SKY)

    # Hostia (círculo blanco con cruz dorada)
    hr = 58 * k
    d.ellipse([P(-hr, -138 - hr), P(hr, -138 + hr)], fill=WHITE, outline=GOLD, width=int(5 * k))
    # cruz dentro de la hostia
    cw = 12 * k
    d.rectangle([P(-cw / 2, -138 - 34 * k), P(cw / 2, -138 + 34 * k)], fill=GOLD)
    d.rectangle([P(-30 * k, -138 - cw / 2), P(30 * k, -138 + cw / 2)], fill=GOLD)

    # Copa del cáliz (trapecio)
    cup_top_y, cup_bot_y = -58 * k, 42 * k
    half_top, half_bot = 92 * k, 48 * k
    d.polygon(
        [P(-half_top, cup_top_y), P(half_top, cup_top_y),
         P(half_bot, cup_bot_y), P(-half_bot, cup_bot_y)],
        fill=GOLD,
    )
    # brillo en la copa
    d.polygon(
        [P(-half_top + 12 * k, cup_top_y), P(-half_top + 38 * k, cup_top_y),
         P(-half_bot + 22 * k, cup_bot_y), P(-half_bot + 6 * k, cup_bot_y)],
        fill=GOLD_LIGHT,
    )
    # borde superior de la copa
    d.line([P(-half_top, cup_top_y), P(half_top, cup_top_y)], fill=GOLD_DARK, width=int(7 * k))

    # Vástago
    d.rectangle([P(-11 * k, cup_bot_y), P(11 * k, 128 * k)], fill=GOLD_DARK)
    # nudo central
    d.ellipse([P(-24 * k, 74 * k), P(24 * k, 116 * k)], fill=GOLD, outline=GOLD_DARK, width=int(4 * k))

    # Base
    d.polygon(
        [P(-78 * k, 170 * k), P(78 * k, 170 * k),
         P(60 * k, 128 * k), P(-60 * k, 128 * k)],
        fill=GOLD,
    )
    d.line([P(-78 * k, 170 * k), P(78 * k, 170 * k)], fill=GOLD_DARK, width=int(7 * k))


def make_icon(size: int, maskable: bool = False) -> Image.Image:
    img = Image.new("RGB", (size, size), CREAM)
    d = ImageDraw.Draw(img)
    if maskable:
        # Zona segura: icono al 72% centrado sobre fondo a sangre
        inner = int(size * 0.72)
        tmp = Image.new("RGB", (inner, inner), CREAM)
        dt = ImageDraw.Draw(tmp)
        draw_chalice(dt, inner, inner // 2, inner // 2)
        img.paste(tmp, ((size - inner) // 2, (size - inner) // 2))
    else:
        draw_chalice(d, size, size // 2, size // 2 - int(size * 0.02))
    return img


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    specs = [
        ("icon-192.png", 192, False),
        ("icon-512.png", 512, False),
        ("maskable-512.png", 512, True),
    ]
    for name, size, maskable in specs:
        path = os.path.join(OUT, name)
        make_icon(size, maskable).save(path, "PNG")
        print(f"OK {path} ({size}x{size}{' maskable' if maskable else ''})")


if __name__ == "__main__":
    main()
