"""Generate responsive, compressed WebP assets for Arabic L10 Hub Hero.

Run from any directory: py -3 optimize_hero_backgrounds.py
Requires: py -3 -m pip install Pillow
Source images are NEVER modified.
"""
from pathlib import Path
from PIL import Image, ImageOps

SOURCE = Path(r"D:\dev\games-translations\public\background")
DESTINATION = SOURCE / "optimized"
DESKTOP_WIDTHS = (960, 1440, 1920)
MOBILE_SIZE = (540, 960)


def save_webp(image, path, quality):
    image.save(path, format="WEBP", quality=quality, method=6)


def needs_update(src, output):
    return not output.exists() or output.stat().st_mtime_ns < src.stat().st_mtime_ns


def main():
    if not SOURCE.is_dir():
        raise SystemExit(f"[ERROR] Source folder not found: {SOURCE}")

    sources = sorted(SOURCE.glob("*.webp"))
    if not sources:
        raise SystemExit(f"[ERROR] No WebP images found in: {SOURCE}")

    DESTINATION.mkdir(parents=True, exist_ok=True)
    total_input = total_output = generated = 0

    for source in sources:
        original_size = source.stat().st_size
        total_input += original_size
        with Image.open(source) as opened:
            image = ImageOps.exif_transpose(opened).convert("RGB")
            for width in DESKTOP_WIDTHS:
                target = DESTINATION / f"{source.stem}-{width}.webp"
                if needs_update(source, target):
                    height = max(1, round(image.height * width / image.width))
                    # All supplied hero backgrounds are at least 1920px wide.
                    if image.width < width:
                        print(f"[WARN] Upscaling {source.name} to {width}px")
                    resized = image.resize((width, height), Image.Resampling.LANCZOS)
                    save_webp(resized, target, 79 if width <= 1440 else 82)
                    generated += 1
                total_output += target.stat().st_size

            portrait = DESTINATION / f"{source.stem}-mobile.webp"
            if needs_update(source, portrait):
                cropped = ImageOps.fit(
                    image, MOBILE_SIZE, Image.Resampling.LANCZOS,
                    centering=(0.5, 0.5)
                )
                save_webp(cropped, portrait, 76)
                generated += 1
            total_output += portrait.stat().st_size

        print(f"[OK] {source.name} | source {original_size / 1024:.0f} KB")

    print("\n--- Hero optimization report ---")
    print(f"Source backgrounds : {len(sources)}")
    print(f"Variants per image : {len(DESKTOP_WIDTHS) + 1}")
    print(f"Files generated     : {generated}")
    print(f"Source data         : {total_input / 1024 / 1024:.2f} MB")
    print(f"All variants on disk: {total_output / 1024 / 1024:.2f} MB")
    print("Note: The browser downloads only the selected resolution, not all variants.")
    print(f"Destination         : {DESTINATION}")


if __name__ == "__main__":
    main()
