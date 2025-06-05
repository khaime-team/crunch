import fs from "fs";
import path from "path";
import { opendir } from "node:fs/promises";
import fileProcessor from "./fileProcessor.js";

export default async function folderProcessor(folder, options) {
  const htmlExtensionRegex = /\.html?$/i;
  const outputFileName = "all.json";
  const outputLayoutName = "layout.json";

  console.log(`\n⌛ Processing ${folder} folder 📂...\n`);
  try {
    const dir = await opendir(folder);
    let pages = [];
    let layouts = [];
    let pageIdCounter = 1;

    for await (const dirent of dir) {
      if (dirent.isFile() && htmlExtensionRegex.test(dirent.name)) {
        const fullPath = path.join(folder, dirent.name);
        console.log(`    -- Processing 📄 ${fullPath} file --`);
        const page = fileProcessor(fullPath, {
          writeOutput: false,
          pageId: pageIdCounter++,
          folderName: path.basename(folder),
          ...options,
        });
        pages.push(page.pageJson);
        layouts.push(page.layoutsJson);
      }
    }

    const finalLayouts = layouts.filter((layout) => layout.type === "home");

    const folderJson = {
      config: {
        merchant: path.basename(folder),
        public: options.public ?? true,
        metadata: {
          name: path.basename(folder),
          tags: ["ecommerce"],
          image: "",
          category: ["ecommerce"],
          popularity: "['popular', 'old']",
        },
      },
      pages,
    };

    const outputDir = path.dirname(outputFileName);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputLayoutDir = path.dirname(outputLayoutName);
    if (!fs.existsSync(outputLayoutDir)) {
      fs.mkdirSync(outputLayoutDir, { recursive: true });
    }

    fs.writeFileSync(
      outputLayoutName,
      JSON.stringify(finalLayouts, null, 2),
      "utf-8"
    );

    fs.writeFileSync(
      outputFileName,
      JSON.stringify(folderJson, null, 2),
      "utf-8"
    );

    console.log(`\n⚒️  Extracted and minified ${pages.length} file(s)`);

    console.log(`\n✅ Layout output saved to: ${outputLayoutName}`);

    console.log(`\n✅ Output saved to: ${outputFileName}`);
  } catch (error) {
    console.error(`❌ Error processing folder: ${error.message}`);
    process.exit(1);
  }
}
