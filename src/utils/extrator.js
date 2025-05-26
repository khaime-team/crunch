import minifyAndEscapeHTML from "./minifier.js";

export default function extractSections(html) {
  const sections = [];
  const sectionRegex = /<section\b[^>]*>([\s\S]*?)<\/section>/gi;
  let match;
  let idCounter = 1;

  while ((match = sectionRegex.exec(html)) !== null) {
    const fullSection = match[0];
    const minifiedHTML = minifyAndEscapeHTML(fullSection);

    sections.push({
      id: idCounter++,
      name: "",
      image: "",
      category: [],
      type: "",
      config: {
        merchant: "",
        public: false,
      },
      html: minifiedHTML,
    });
  }

  return sections;
}
