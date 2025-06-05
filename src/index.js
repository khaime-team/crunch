#!/usr/bin/env node

import fs from "fs";
import folderProcessor from "./utils/folderProcessor.js";
import fileProcessor from "./utils/fileProcessor.js";

function showUsage() {
  console.log(`\nUsage: crunch <input.html>\n`);
  console.log(`Examples:`);
  console.log(`  crunch index.html --merchant=johnDoe`);
  console.log(`  crunch some_folder_containing_HTML_files`);
  console.log(
    `  crunch some_folder --no-header --public=false --category=ecommerce`
  );
}

/**
 * FLAGS
 *      --no-headers: excludes sections with navbar and footer as id values
 *
 *      --public: make a template publicity true/false:
 *              USAGE: --public=true
 *
 */

function main() {
  // const inputArg = args.find((arg) => !arg.startsWith("--"));

  const args = process.argv.slice(2);
  const inputArg = args.find((arg) => !arg.startsWith("--"));
  const options = {};

  if (!inputArg) {
    console.error("❌  Error: No input file specified");
    showUsage();
    process.exit(1);
  }

  // project/template category, i.e, ecommerce, health, etc.
  const categoryFlag = args.find((arg) => arg.startsWith("--category"));

  if (categoryFlag) {
    const value = categoryFlag.split("=")[1];
    options.category = value;
  }

  const merchantFlag = args.find((arg) => arg.startsWith("--merchant"));

  if (merchantFlag) {
    const value = merchantFlag.split("=")[1];
    options.merchant = value;
  }

  options.noHeader = args.includes("--no-header");

  const publicFlag = args.find((arg) => arg.startsWith("--public="));

  if (publicFlag) {
    const value = publicFlag.split("=")[1];
    options.public = value === "true";
  } else {
    options.public = true;
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
