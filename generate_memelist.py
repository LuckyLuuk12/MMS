import os
import json

# Define the folder to scan and the output JSON file
MEMES_DIR = "./static/memes"
OUTPUT_FILE = "./static/memes_list.json"

# Define file type mappings
FILE_TYPE_MAP = {
    "img": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    "video": [".mp4", ".webm", ".mov"],
    "audio": [".mp3", ".wav", ".ogg"]
}

def get_file_type(extension):
    for file_type, extensions in FILE_TYPE_MAP.items():
        if extension.lower() in extensions:
            return file_type
    return "unknown"

def generate_assets_json():
    assets = []
    for root, _, files in os.walk(MEMES_DIR):
        for file_name in files:
            file_path = os.path.join(root, file_name)
            ext = os.path.splitext(file_name)[1]
            file_type = get_file_type(ext)
            relative_path = os.path.relpath(file_path, MEMES_DIR).replace("\\", "/")
            assets.append({"name": relative_path, "type": file_type})

    with open(OUTPUT_FILE, "w") as json_file:
        json.dump(assets, json_file, indent=2)
    print(f"Generated {OUTPUT_FILE} with {len(assets)} assets.")

if __name__ == "__main__":
    generate_assets_json()
