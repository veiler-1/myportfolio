import os
import shutil
import subprocess
from PIL import Image

dist_dir = r"c:\a77777777\dist"
if os.path.exists(dist_dir):
    shutil.rmtree(dist_dir)

os.makedirs(dist_dir, exist_ok=True)
os.makedirs(os.path.join(dist_dir, "assets"), exist_ok=True)
os.makedirs(os.path.join(dist_dir, "pdf_images"), exist_ok=True)

# Copy HTML, CSS, JS
shutil.copy(r"c:\a77777777\index.html", dist_dir)
shutil.copy(r"c:\a77777777\style.css", dist_dir)
shutil.copy(r"c:\a77777777\script.js", dist_dir)

# Compress assets images
for f in os.listdir(r"c:\a77777777\assets"):
    src = os.path.join(r"c:\a77777777\assets", f)
    dst = os.path.join(dist_dir, "assets", f)
    if f.lower().endswith(('.jpg', '.jpeg', '.png')):
        with Image.open(src) as img:
            img.convert("RGB").save(dst, "JPEG", quality=70, optimize=True)

# Compress pdf_images
for f in os.listdir(r"c:\a77777777\pdf_images"):
    if f.startswith("page_") and f.lower().endswith(".png"):
        src = os.path.join(r"c:\a77777777\pdf_images", f)
        dst = os.path.join(dist_dir, "pdf_images", f)
        with Image.open(src) as img:
            img.convert("RGB").save(dst, "JPEG", quality=60, optimize=True)

# Run Surge deploy
res = subprocess.run(
    ["npx.cmd", "-y", "surge", "./dist", "--domain", "ahmed-saad-portfolio.surge.sh", "--token", "4f44e2b29a0d2b1b8ff6c382ef06e2c3"],
    capture_output=True,
    text=True,
    encoding="utf-8",
    errors="ignore"
)

with open("surge_output.log", "w", encoding="utf-8") as f:
    f.write("STDOUT:\n" + res.stdout + "\nSTDERR:\n" + res.stderr)

print("Deploy finished! Output written to surge_output.log")
