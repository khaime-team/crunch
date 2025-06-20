import path from "path";
import minifyAndEscapeHTML from "./minifier.js";

export default function extractSections(html, options) {
  const sections = [];

  const layouts = {
    navbar: null,
    footer: null,
  };

  const arelayoutsProcessed = {
    navbar: false,
    footer: false,
  };

  const sectionRegex = /<section\b[^>]*>([\s\S]*?)<\/section>/gi;
  let match;
  let idCounter = 1;

  while ((match = sectionRegex.exec(html)) !== null) {
    const fullSection = match[0];

    // extract the `id` attribute, if any
    const idMatch = fullSection.match(/\bid=["']?([\w-]+)["']?/i);
    const sectionId = idMatch ? idMatch[1].toLowerCase() : null;

    const minifiedHTML = minifyAndEscapeHTML(fullSection);

    const type =
      path.basename(options.inputArg, path.extname(options.inputArg)) ===
      "index"
        ? "home"
        : path.basename(options.inputArg, path.extname(options.inputArg));

    if (sectionId === "navbar" && !arelayoutsProcessed.navbar) {
      layouts.navbar = {
        id: 1,
        name: options.folderName + "_" + type + "_" + sectionId,
        image:
          "{{CLOUDFRONT_URL}}/section-template-images/" +
          options.folderName.toLowerCase() +
          "/sections/",
        category: options.category || "",
        type: sectionId,
        config: {
          merchant: options.merchant || options.folderName,
          public: options.public,
        },
        html: minifiedHTML,
      };
      arelayoutsProcessed.navbar = true;
    } else if (sectionId === "footer" && !arelayoutsProcessed.footer) {
      layouts.footer = {
        id: 1,
        name: options.folderName + "_" + type + "_" + sectionId,
        image:
          "{{CLOUDFRONT_URL}}/" +
          options.folderName.toLowerCase() +
          "/sections/",
        category: options.category || "",
        type: sectionId,
        config: {
          merchant: options.merchant || options.folderName,
          public: options.public,
        },
        html: minifiedHTML,
      };
      arelayoutsProcessed.footer = true;
    } else if (sectionId !== "navbar" && sectionId !== "footer") {
      sections.push({
        id: idCounter++,
        name:
          (options.folderName || options.merchant) +
          "_" +
          type +
          "_" +
          sectionId,
        image:
          "{{CLOUDFRONT_URL}}/section-template-images/" +
          options.folderName.toLowerCase() +
          "/sections/",
        category: [options.category || ""],
        type: sectionId,
        config: {
          merchant: options.merchant || options.folderName,
          public: options.public,
        },
        html: minifiedHTML,
      });
    }
  }

  return { sections, layouts };
}
