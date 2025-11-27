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
- `content.js` - JavaScript to hide feed elements dynamically
- `hide-feed.css` - CSS rules to hide the feed
- `icon*.png` - Extension icons

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

If the feed still appears:
1. Try refreshing the LinkedIn page
2. Make sure the extension is enabled in `chrome://extensions/`
3. Clear your browser cache and reload

## License

MIT License - Feel free to modify and distribute as needed.
