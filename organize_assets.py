import os
import shutil
from PIL import Image

assets_dir = "assets"
os.makedirs(assets_dir, exist_ok=True)

# Map known key extracted images to clear asset names
mapping = {
    "img_p1_1.jpeg": "profile_hero.jpg",
    "img_p2_3.jpeg": "profile_about.jpg",
    "img_p3_3.jpeg": "education_badge.jpg",
    "img_p4_3.jpeg": "experience_hero.jpg",
    "img_p6_3.jpeg": "project_network_cisco.jpg",
    "img_p6_5.jpeg": "project_network_topo.jpg",
    "img_p7_3.jpeg": "project_flutter_mobile.jpg",
    "img_p7_4.jpeg": "project_flutter_mockup.jpg",
    "img_p8_3.jpeg": "contact_photo.jpg"
}

for src_name, dst_name in mapping.items():
    src_path = os.path.join("pdf_images", src_name)
    dst_path = os.path.join(assets_dir, dst_name)
    if os.path.exists(src_path):
        shutil.copy(src_path, dst_path)
        print(f"Copied {src_name} -> {dst_name}")

print("Assets setup completed.")
