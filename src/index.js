#!/usr/bin/env node

import fs from "fs";
import path from "path";
import extractSections from "./utils/extrator.js";

function showUsage() {
  console.log(`\nSectr - HTML Section Extractor\n`);
  console.log(`Usage: sectr <input.html> [output.json]\n`);
  console.log(`Examples:`);
  console.log(`  sectr index.html`);
  console.log(`  sectr index.html output.json`);
  console.log(`  sectr src/pages/home.html data/sections.json`);
}

function main() {
  const inputFile = process.argv[2];

  if (!inputFile) {
    console.error("❌  Error: No input file specified");
    showUsage();
    process.exit(1);
  }

  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Error: File '${inputFile}' not found`);
    process.exit(1);
  }

  // const autoNameFile = inputFile.split(".")[0];
  const autoNameFile = path.basename(inputFile, path.extname(inputFile));
  const outputFile = process.argv[3] || `${autoNameFile}.json`;

  try {
    console.log(`⌛ Processing ${inputFile}...`);
    const html = fs.readFileSync(inputFile, "utf8");
    const sections = extractSections(html);
    if (sections.length === 0) {
      console.warn(`⚠️  Warning: No <section> tags found in ${inputFile}`);
    }
    const pageJson = {
      id: 1,
      name: "",
      type: "",
      pageSlug: "",
      sections: sections,
    };

    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputFile, JSON.stringify(pageJson, null, 2), "utf8");

    console.log(`⚒️  Extracted and minified ${sections.length} section(s)`);

    console.log(`✅ Output saved to: ${outputFile}`);
  } catch (error) {
    console.error(`❌ Error processing file: ${error.message}`);
    process.exit(1);
  }
}

main();
