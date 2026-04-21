/**
 * Upload hero ambient WebMs to Cloudinary (signed upload).
 * MCP `upload-asset` only accepts remote HTTP(S) URLs — local files use this script instead.
 *
 * Usage (from repo root):
 *   pnpm run upload:hero-textures
 *
 * Requires in `.env.local`: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 */
import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const require = createRequire(import.meta.url);
const cld = require("cloudinary").v2;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error(
    "Missing Cloudinary env. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env.local"
  );
  process.exit(1);
}

cld.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

const uploads = [
  { file: "public/video/texture-lab-hero.webm", public_id: "curated/homepage/texture-lab-hero-a" },
  { file: "public/video/texture-lab-hero-b.webm", public_id: "curated/homepage/texture-lab-hero-b" },
];

async function main() {
  console.log("Uploading hero texture videos to Cloudinary…\n");

  for (const { file, public_id } of uploads) {
    const abs = path.join(root, file);
    if (!existsSync(abs)) {
      console.error(`Skip (missing file): ${file}`);
      continue;
    }
    console.log(`→ ${public_id}  (${file})`);
    const res = await cld.uploader.upload(abs, {
      resource_type: "video",
      public_id,
      overwrite: true,
      invalidate: true,
    });
    console.log(`  secure_url: ${res.secure_url}\n`);
  }

  console.log(
    "\nDone. The app builds video URLs from NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME + fixed public_ids — no extra env vars."
  );
  console.log("If cloud name is unset locally, `/public/video/*.webm` fallbacks are used instead.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
