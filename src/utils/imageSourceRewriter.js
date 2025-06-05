export default function rewriteImageSources(html, folderName = "") {
    return html.replace(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi, (match, src) => {
      let newSrc = src;
  
      newSrc = newSrc.replace(/\.(png|jpe?g)$/i, ".webp");
  
      // this replaces ./assets with {{CLOUDFRONT_URL}}/folderName (please pass folderName as a parameter)
      newSrc = newSrc.replace(/^\.\/assets/, `{{CLOUDFRONT_URL}}/${folderName}`);
  
      return match.replace(src, newSrc);
    });
  }
  