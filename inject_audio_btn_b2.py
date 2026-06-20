"""
Inject audio listen buttons into EXAMEN_PRACTICA_DELE_B2.pdf
- Page with Prueba 2 header → button linking to audio-dele-b2.html
- Page with Tarea 1 (conversaciones) → button for Tarea 1
- Page with Tarea 2 (monologues) → button for Tarea 2
- Page with Tarea 3 (reportaje) → button for Tarea 3
"""
import os
from pypdf import PdfReader, PdfWriter
from pypdf.generic import (
    ArrayObject,
    NameObject, DictionaryObject, NumberObject, TextStringObject,
    RectangleObject
)
StringObject = TextStringObject
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from io import BytesIO

PDF_IN  = r"DESCARGABLES_PDF\DELE_B2\EXAMEN_PRACTICA_DELE_B2.pdf"
PDF_OUT = r"DESCARGABLES_PDF\DELE_B2\EXAMEN_PRACTICA_DELE_B2.pdf"

BASE_URL = "http://localhost:8080/audio-dele-b2.html"

# ── Buttons to inject: (page_index_0, label, url, x, y, w, h)
BUTTONS = [
    # Page 0 = cover — no button needed
    # Page 1 = Prueba 1 lectura — no audio
    # Find the Prueba 2 page (approx page 5-6) — full tarea link
    (5,  "▶  Escuchar Prueba 2 · Audición",        BASE_URL,            55, 58,  200, 22),
    (5,  "▶  Tarea 1 · Conversaciones",             BASE_URL + "#card-c1",   55, 33,  120, 18),
    (7,  "▶  Tarea 2 · Monólogos",                  BASE_URL + "#t2-section", 55, 33,  120, 18),
    (9,  "▶  Tarea 3 · Reportaje",                  BASE_URL + "#t3-section", 55, 33,  120, 18),
]

def overlay_button(label, x, y, w, h, color=(0.11, 0.16, 0.29)):
    """Create a small PDF page with a coloured button label (reportlab)."""
    buf = BytesIO()
    c = canvas.Canvas(buf, pagesize=A4)
    pw, ph = A4

    # Convert from mm-style coords: x,y are from bottom-left in points
    # Our coords are in points already (72pt = 1 inch)
    bx, by, bw, bh = x, y, w, h

    # Shadow
    c.setFillColorRGB(0, 0, 0, 0.1)
    c.roundRect(bx+1, by-1, bw, bh, 4, fill=1, stroke=0)

    # Button background
    r, g, b = color
    c.setFillColorRGB(r, g, b)
    c.roundRect(bx, by, bw, bh, 4, fill=1, stroke=0)

    # Gold top bar accent
    c.setFillColorRGB(0.83, 0.57, 0.04)
    c.roundRect(bx, by + bh - 3, bw, 3, 2, fill=1, stroke=0)

    # Label
    font_size = 7.5 if len(label) > 26 else 8.5
    c.setFillColorRGB(1, 1, 1)
    c.setFont("Helvetica-Bold", font_size)
    text_x = bx + 8
    text_y = by + (bh - font_size) / 2 + 1
    c.drawString(text_x, text_y, label)

    c.save()
    buf.seek(0)
    return buf

reader = PdfReader(PDF_IN)
writer = PdfWriter()
total_pages = len(reader.pages)
print(f"PDF has {total_pages} pages")

for i in range(total_pages):
    page = reader.pages[i]
    writer.add_page(page)

# Build a dict of page_idx → list of buttons
page_buttons = {}
for (pg, label, url, x, y, w, h) in BUTTONS:
    if pg < total_pages:
        page_buttons.setdefault(pg, []).append((label, url, x, y, w, h))
    else:
        print(f"  SKIP page {pg} (only {total_pages} pages)")

for pg_idx, btns in page_buttons.items():
    page = writer.pages[pg_idx]
    pw = float(page.mediabox.width)
    ph = float(page.mediabox.height)

    for (label, url, x, y, w, h) in btns:
        # Create overlay with button graphic
        overlay_buf = overlay_button(label, x, y, w, h)
        overlay_reader = PdfReader(overlay_buf)
        overlay_page = overlay_reader.pages[0]

        # Merge overlay onto page
        page.merge_page(overlay_page)

        # Add URI annotation
        rect = RectangleObject([x, y, x + w, y + h])
        annot = DictionaryObject({
            NameObject("/Type"): NameObject("/Annot"),
            NameObject("/Subtype"): NameObject("/Link"),
            NameObject("/Rect"): rect,
            NameObject("/Border"): ArrayObject([NumberObject(0), NumberObject(0), NumberObject(0)]),
            NameObject("/A"): DictionaryObject({
                NameObject("/S"): NameObject("/URI"),
                NameObject("/URI"): StringObject(url),
            }),
        })
        if "/Annots" not in page:
            page[NameObject("/Annots")] = ArrayObject()
        page["/Annots"].append(annot)

        print(f"  Button on page {pg_idx+1}: '{label.encode('ascii','replace').decode()}' -> {url}")

with open(PDF_OUT, "wb") as f:
    writer.write(f)

print(f"\nSaved: {PDF_OUT}  ({os.path.getsize(PDF_OUT)//1024}KB)")
