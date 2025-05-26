# Sectr - Khaime HTML Parser

Minifies HTML `<section>` blocks per file and outputs JSON for templating, etc.

## Installation

```bash
npm install -g https://github.com/khaime-team/sectr.git
```

## Usage

```bash
# Basic usage
sectr input.html

# Specify output file

sectr input.html output.json

# Examples

sectr src/pages/home.html
sectr index.html data/sections.json`
````

## What it does

1. **Extracts** all `<section>`tags from your HTML file
2. **Minifies** the HTML by removing unnecessary whitespace
3. **Structures** the data into a JSON format with metadata
4. **Preserves** important attributes like`id`, `class`, `data-gjs-name`, etc.

## Output Format

```json
{
  "id": 1,
  "name": "",
  "type": "",
  "pageSlug": "",
  "sections": [
    {
      "id": 1,
      "name": "hero",
      "image": "",
      "category": [],
      "type": "hero",
      "config": {
        "merchant": "",
        "public": false
      },
      "html": "<section id=\"hero\" class=\"hero-section\">...</section>"
    }
  ]
}
```

## Features

- ✅ Extracts all `<section>` elements
- ✅ Minifies HTML content
- ✅ Auto-generates output filename
- ✅ Preserves section metadata
- ✅ Error handling for missing files
- ✅ Cross-platform compatibility

## Requirements

- Node.js >= 14.0.0

## License

MIT
