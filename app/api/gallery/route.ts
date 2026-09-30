import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

export async function GET() {
  const imagesRoot = path.join(process.cwd(), "public", "images");

  let folders: string[] = [];
  try {
    folders = fs
      .readdirSync(imagesRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
  } catch {
    folders = [];
  }

  const albums = folders
    .map((folder) => {
      const folderPath = path.join(imagesRoot, folder);

      let files: string[] = [];
      try {
        files = fs
          .readdirSync(folderPath)
          .filter((f) =>
            IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()),
          )
          .sort((a, b) => {
            const numA = parseInt(a, 10);
            const numB = parseInt(b, 10);
            if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
            return a.localeCompare(b);
          });
      } catch {
        files = [];
      }

      return {
        folder,
        images: files.map((f) => `/images/${folder}/${f}`),
      };
    })
    .filter((album) => album.images.length > 0);

  return NextResponse.json({ success: true, albums });
}
