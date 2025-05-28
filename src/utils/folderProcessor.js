import fs from "fs";
import path from "path";
import { opendir } from "node:fs/promises";
import fileProcessor from "./fileProcessor.js";

export default async function folderProcessor(folder, options) {
  // 1. Check if folder exist - already done in the main()
  // 2. Open folder and search for HTML files

  const htmlExtensionRegex = /\.html?$/i;
  const outputFileName = "all.json";

  // 3. Take note of flags/options

  try {
    console.log(`⌛ Processing ${folder} folder 📂...`);
    const dir = await opendir(folder);
    let pages = [];
    for await (const dirent of dir) {
      if (dirent.isFile() && htmlExtensionRegex.test(dirent.name)) {
        const fullPath = path.join(folder, dirent.name);
        console.log(`    -- Processing 📄 ${fullPath} file --`);
        let page = fileProcessor(fullPath, options);
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
