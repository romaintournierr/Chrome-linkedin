# LinkedIn Feed Hider - Chrome Extension

A Chrome extension that hides the LinkedIn feed while keeping the rest of the website fully functional.

## Features

- ✅ Hides the main LinkedIn feed
- ✅ Hides the "Start a post" box
- ✅ **Visual indicator** shows when the feed is hidden
- ✅ Keeps navigation accessible
- ✅ Keeps messaging functional
- ✅ Keeps notifications working
- ✅ Keeps all other LinkedIn features usable
- ✅ Works with dynamically loaded content

## What Gets Hidden

- Main feed posts
- "Start a post" composer
- Sponsored content in feed
- All feed updates

## What Remains Visible

- Top navigation bar
- Search functionality
- Messaging
- Notifications
- Profile access
- Network/connections
- Jobs section
- All other LinkedIn pages (profile, company pages, etc.)

## Installation

### From Source (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the folder containing this extension
6. The extension should now be active!

### Usage

Once installed, simply navigate to LinkedIn. The feed will be automatically hidden while all other features remain accessible.

When you visit the LinkedIn homepage, you'll see a blue notification in the top-right corner confirming that the feed has been hidden. This indicator:
- Appears for 5 seconds then automatically fades away
- Can be manually dismissed by clicking the × button
- Only appears on the feed page (not on profiles, jobs, etc.)

## Files

- `manifest.json` - Extension configuration
- `content.js` - JavaScript to hide feed elements dynamically (with debug logging)
- `hide-feed.css` - CSS rules to hide the feed
- `TROUBLESHOOTING.md` - Detailed troubleshooting guide
- `ICONS.md` - Instructions for adding extension icons

## Technical Details

The extension uses:
- **Manifest V3** - Latest Chrome extension format
- **Content Scripts** - Inject CSS and JavaScript into LinkedIn pages
- **MutationObserver** - Watch for dynamically loaded content
- **CSS with !important** - Ensure styles override LinkedIn's styles

## Privacy

This extension:
- Does NOT collect any data
- Does NOT track your activity
- Does NOT require special permissions beyond accessing LinkedIn pages
- Runs entirely locally in your browser

## Troubleshooting

### Quick Fixes

If the feed still appears:
1. **Reload the extension**: Go to `chrome://extensions/`, find LinkedIn Feed Hider, and click the reload icon
2. **Refresh LinkedIn**: Hard refresh the page with `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
3. **Check it's enabled**: Make sure the extension toggle is ON in `chrome://extensions/`
4. **View console logs**: Right-click → Inspect → Console tab, look for `[LinkedIn Feed Hider]` messages

### Detailed Troubleshooting

For step-by-step debugging instructions, see **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)**

The extension includes console logging to help diagnose issues. Open Chrome DevTools (F12) and check the Console tab for debug messages.

## License

MIT License - Feel free to modify and distribute as needed.
