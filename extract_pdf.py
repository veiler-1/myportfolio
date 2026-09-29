import os
import fitz  # PyMuPDF

pdf_path = r"C:\Users\Veiler\Downloads\Black and Yellow Neon Gradient Modern Bold Sparkle Geometric Photography Portfolio Presentation (2).pdf"

doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")
os.makedirs("pdf_images", exist_ok=True)

with open("extracted_pdf_full.txt", "w", encoding="utf-8") as f:
    for i, page in enumerate(doc):
        text = page.get_text()
        f.write(f"\n==================== PAGE {i+1} ====================\n")
        f.write(text)
        
        # Save page image
        pix = page.get_pixmap(dpi=200)
        pix.save(f"pdf_images/page_{i+1}.png")
        
        # Extract embedded images
        image_list = page.get_images(full=True)
        for img_idx, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            image_filename = f"pdf_images/img_p{i+1}_{img_idx+1}.{image_ext}"
            with open(image_filename, "wb") as img_f:
                img_f.write(image_bytes)

print("Full extraction completed!")
