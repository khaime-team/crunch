#!/usr/bin/env node

import fs from "fs";
import path from "path";
import folderProcessor from "./utils/folderProcessor.js";
import fileProcessor from "./utils/fileProcessor.js";

function showUsage() {
  console.log(`\nUsage: sectr <input.html>\n`);
  console.log(`Examples:`);
  console.log(`  sectr index.html`);
  console.log(`  sectr some_folder_containing_HTML_files`);
}

/**
 * FLAGS
 *      --no-headers: excludes sections with navbar and footer as id values
 *
 */

function main() {
  const inputArg = process.argv[2];
  const options = {};

  if (!inputArg) {
    console.error("❌  Error: No input file specified");
    showUsage();
    process.exit(1);
  }

  if (!fs.existsSync(inputArg)) {
    console.error(`❌ Error: File '${inputArg}' not found`);
    process.exit(1);
  }

  const stat = fs.statSync(inputArg);

  if (stat.isDirectory()) {
    folderProcessor(inputArg, options);
  } else if (stat.isFile()) {
    fileProcessor(inputArg, options);
  } else {
    console.error(`❌ Error: '${inputArg}' is neither a file nor a directory.`);
    process.exit(1);
  }
}

main();
