import os
from PIL import Image

img_dir = "pdf_images"
os.makedirs("assets", exist_ok=True)

for filename in os.listdir(img_dir):
    if filename.endswith((".jpeg", ".jpg", ".png")) and not filename.startswith("page_"):
        filepath = os.path.join(img_dir, filename)
        with Image.open(filepath) as img:
            print(f"{filename}: size={img.size}, mode={img.mode}, bytes={os.path.getsize(filepath)}")
