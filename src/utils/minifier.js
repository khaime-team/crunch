export default function minifyAndEscapeHTML(sectionBlock) {
  return (
    sectionBlock
      // .replace(/"/g, '\\"')
      .replace(/>\s+</g, "><")
      .replace(/\n/g, " ")
      .replace(/\s{2,}/g, " ")
      .replace(/\s*(=)\s*/g, "$1")
      .replace(/(\S)\s+(<)/g, "$1$2")
      .replace(/(>)\s+(\S)/g, "$1$2")
      .trim()
  );
}
