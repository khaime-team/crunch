import fs from "fs";
import path from "path";
import { opendir } from "node:fs/promises";
import fileProcessor from "./fileProcessor.js";

export default async function folderProcessor(folder, options) {
  const htmlExtensionRegex = /\.html?$/i;
  const outputFileName = "all.json";

  console.log(`⌛ Processing ${folder} folder 📂...`);
  try {
    const dir = await opendir(folder);
    let pages = [];
    let pageIdCounter = 1;

    for await (const dirent of dir) {
      if (dirent.isFile() && htmlExtensionRegex.test(dirent.name)) {
        const fullPath = path.join(folder, dirent.name);
        console.log(`    -- Processing 📄 ${fullPath} file --`);
        const page = fileProcessor(fullPath, {
          writeOutput: false,
          pageId: pageIdCounter++,
          folderName: path.basename(folder),
        });
        pages.push(page);
      }
    }

    const folderJson = {
      config: {
        merchant: path.basename(folder),
        public: true,
        metadata: {
          name: path.basename(folder),
          tags: ["ecommerce"],
          image: "",
          category: ["ecommerce"],
          popularity: " ['popular', 'old']",
        },
      },
      pages,
    };

    const outputDir = path.dirname(outputFileName);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(
      outputFileName,
      JSON.stringify(folderJson, null, 2),
      "utf-8"
    );

    console.log(`⚒️  Extracted and minified ${pages.length} file(s)`);

    console.log(`✅ Output saved to: ${outputFileName}`);
  } catch (error) {
    console.error(`❌ Error processing folder: ${error.message}`);
    process.exit(1);
  }
}
