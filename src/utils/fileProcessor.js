import fs from "fs";
import path from "path";
import extractSections from "./extrator.js";

export default function fileProcessor(inputArg, options) {
  const autoNameFile = path.basename(inputArg, path.extname(inputArg));

  const outputFile = `${autoNameFile}.json`;

  let pageJson = {};

  try {
    console.log(`⌛ Processing 📄 ${inputArg} file...`);
    const html = fs.readFileSync(inputArg, "utf8");
    const sections = extractSections(html);
    if (sections.length === 0) {
      console.warn(`⚠️  Warning: No <section> tags found in ${inputArg}`);
    }
    pageJson = {
      id: "",
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

  return pageJson;
}
