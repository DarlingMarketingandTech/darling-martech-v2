import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["src/app", "src/components", "src/features"];

function walk(dir: string, files: string[] = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, files);
    if (stat.isFile() && /\.(tsx|ts)$/.test(full)) files.push(full);
  }
  return files;
}

const motionImport = /(from "framer-motion"|from 'framer-motion'|from "gsap"|from 'gsap'|from "@gsap\/react"|from '@gsap\/react')/;
let failures = 0;

for (const root of ROOTS) {
  for (const file of walk(root)) {
    const source = readFileSync(file, "utf8");
    if (!motionImport.test(source)) continue;

    const firstRealLine = source
      .split("\n")
      .map((line) => line.trim())
      .find((line) => line.length > 0);

    if (firstRealLine !== '"use client";' && firstRealLine !== "'use client';") {
      failures += 1;
      console.error(`${file} imports motion/GSAP but is missing a top-level "use client" directive.`);
    }
  }
}

if (failures > 0) {
  console.error(`\nMotion boundary audit failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log("Motion boundary audit passed.");
