import os
import shutil
import subprocess

dist_dir = r"c:\a77777777\dist"
if os.path.exists(dist_dir):
    shutil.rmtree(dist_dir)

os.makedirs(dist_dir, exist_ok=True)

# Copy core files
shutil.copy(r"c:\a77777777\index.html", dist_dir)
shutil.copy(r"c:\a77777777\style.css", dist_dir)
shutil.copy(r"c:\a77777777\script.js", dist_dir)
shutil.copytree(r"c:\a77777777\assets", os.path.join(dist_dir, "assets"))
shutil.copytree(r"c:\a77777777\pdf_images", os.path.join(dist_dir, "pdf_images"))

print("Dist directory prepared!")
