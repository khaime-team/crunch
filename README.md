# Crunch - Khaime HTML Parser

Minifies HTML `<section>` blocks per file or folder/directory and outputs JSON for templating, etc.

## Installation

```bash
npm install -g https://github.com/khaime-team/crunch.git
```

## Usage

```bash
# Basic usage with a html file
crunch input.html --no-header --public=false --category=ecommerce

# Specify a folder containing HTML files
crunch folder --no-header --public=false --category=ecommerce
```

## What it does

> With a folder, it initially scans the folder for html files and does the following:

1. **Extracts** all `<section>`tags from your HTML file
2. **Minifies** the HTML by removing unnecessary whitespace
3. **Structures** the data into a JSON format with metadata
4. **Preserves** important attributes like`id`, `class`, `data-gjs-name`, etc.

## Output Format

### HTML File Output

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

### Folder Output

```json
{
  "config": {
    "merchant": "",
    "public": true,
    "metadata": {
      "name": "",
      "tags": [""],
      "image": "",
      "category": [""],
      "popularity": " ['popular', 'old']"
    }
  },
  "pages": [
    {
      "id": 1,
      "name": "",
      "type": "",
      "pageSlug": "",
      "sections": [
        {
          "id": 1,
          "name": "",
          "image": "",
          "category": [],
          "type": "",
          "config": {
            "merchant": "",
            "public": true
          },
          "html": ""
        }
      ]
    }
  ]
}
```

## Features

- ✅ Extracts all `<section>` elements
- ✅ Minifies HTML content
- ✅ Auto-generates output filename and some JSON fields
- ✅ Preserves section metadata
- ✅ Error handling for missing files
- ✅ Cross-platform compatibility

## Requirements

- Node.js >= 14.0.0

## License

MIT
