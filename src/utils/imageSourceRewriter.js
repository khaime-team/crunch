export default function rewriteImageSources(html, folderName = "") {
  // First, update <img src="...">
  html = html.replace(
    /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi,
    (match, src) => {
      let newSrc = src;
      newSrc = newSrc.replace(/\.(png|jpe?g)$/i, ".webp");
      newSrc = newSrc.replace(
        /^\.\/assets/,
        `{{CLOUDFRONT_URL}}/${folderName}`
      );
      return match.replace(src, newSrc);
    }
  );

  // Then, update inline background images like style="background-image: url('./assets/xyz.png')"
  html = html.replace(
    /style\s*=\s*["'][^"']*url\((['"]?)([^"')]+)(['"]?)\)[^"']*["']/gi,
    (match, quote1, url, quote2) => {
      let newUrl = url;
      newUrl = newUrl.replace(/\.(png|jpe?g)$/i, ".webp");
      newUrl = newUrl.replace(
        /^\.\/assets/,
        `{{CLOUDFRONT_URL}}/${folderName.toLowerCase()}`
      );
      const newStyle = match.replace(url, newUrl);
      return newStyle;
    }
  );

  return html;
}
