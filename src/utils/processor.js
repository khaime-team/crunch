import fs from "fs";
import path from "path";
import extractSections from "./extrator.js";

export default function processor(inputArg, options) {
  try {
    console.log(`⌛ Processing 📄 ${inputArg} file...`);
    const html = fs.readFileSync(inputArg, "utf8");
    const sections = extractSections(html);
    if (sections.length === 0) {
      console.warn(`⚠️  Warning: No <section> tags found in ${inputArg}`);
    }
    const pageJson = {
      id: 1,
      name: "",
      type: "",
      pageSlug: "",
      sections: sections,
    };
  } catch (error) {
    console.error(`❌ Error processing file: ${error.message}`);
    process.exit(1);
  }
}
