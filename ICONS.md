# Extension Icons

To add icons to this extension, you can:

## Option 1: Use an Online Tool
1. Visit a site like [favicon.io](https://favicon.io/) or [IconGenerator](https://www.icongenerator.net/)
2. Create icons in sizes: 16x16, 48x48, and 128x128 pixels
3. Save them as `icon16.png`, `icon48.png`, and `icon128.png` in this directory

## Option 2: Use Design Software
1. Create icons using tools like GIMP, Photoshop, or Figma
2. Export in the required sizes (16x16, 48x48, 128x128)
3. Save in this directory

## Option 3: Use a Simple Logo
You can use a simple design like:
- A LinkedIn logo with an "X" or strikethrough
- An eye with a slash through it
- A simple "Hide" text icon

## Adding Icons to manifest.json

Once you have the icon files, add this to `manifest.json` after the `content_scripts` section:

```json
"icons": {
  "16": "icon16.png",
  "48": "icon48.png",
  "128": "icon128.png"
}
```

## Note
Icons are optional for development/testing. The extension will work without them, but they're recommended for a professional appearance.
