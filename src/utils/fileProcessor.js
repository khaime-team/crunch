import fs from "fs";
import path from "path";
import rewriteImageSources from "./imageSourceRewriter.js";
import extractSections from "./extrator.js";

export default function fileProcessor(inputArg, options = {}) {
  const autoNameFile = path.basename(inputArg, path.extname(inputArg));
  const outputFile = `${autoNameFile}.json`;

  try {
    if (options.writeOutput) {
      console.log(`\n⌛ Processing 📄 ${inputArg} file...\n`);
    }

    let html = fs.readFileSync(inputArg, "utf8");
    html = rewriteImageSources(html, options.folderName || "assets");

    const extractedSections = extractSections(html, { inputArg, ...options });

    if (extractedSections.sections.length === 0) {
      console.warn(`⚠️  Warning: No <section> tags found in ${inputArg}`);
    }

    const type =
      path.basename(inputArg, path.extname(inputArg)) === "index"
        ? "home"
        : path.basename(inputArg, path.extname(inputArg));

    const pageJson = {
      id: options.pageId || 419,
      name: (options.folderName || options.merchant) + "-" + type,
      type,
      pageSlug: type,
      sections: extractedSections.sections,
    };

    const layoutsJson = {
      type,
      layoutSections: extractedSections.layouts,
    };

    if (options.writeOutput !== false) {
      const outputDir = path.dirname(outputFile);
      console.log(`⌛ Processing 📄 ${inputArg} file...`);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(outputFile, JSON.stringify(pageJson, null, 2), "utf8");
      console.log(
        `\n⚒️  Extracted and minified ${extractedSections.sections.length} section(s)`
      );
      console.log(`✅ Output saved to: ${outputFile}`);
    }

    return { pageJson, layoutsJson };
  } catch (error) {
    console.error(`❌ Error processing file: ${error.message}`);
    process.exit(1);
  }
}
