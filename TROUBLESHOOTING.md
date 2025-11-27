# Troubleshooting Guide

If the LinkedIn Feed Hider extension is not working, follow these steps to diagnose and fix the issue.

## Step 1: Verify Extension is Installed and Enabled

1. Open Chrome and go to `chrome://extensions/`
2. Look for "LinkedIn Feed Hider" in the list
3. Make sure the toggle is **ON** (blue)
4. Check that there are no error messages

## Step 2: Check Console Logs

The extension outputs debug information to help identify issues.

1. Open LinkedIn in your browser
2. Right-click anywhere on the page and select **Inspect** (or press F12)
3. Click on the **Console** tab
4. Look for messages starting with `[LinkedIn Feed Hider]`

### What to look for:

- `[LinkedIn Feed Hider] Extension loaded` - Extension script is running
- `[LinkedIn Feed Hider] Initializing...` - Extension is starting up
- `[LinkedIn Feed Hider] Running hideFeed()` - Extension is trying to hide elements
- `[LinkedIn Feed Hider] Found X elements for selector: ...` - Shows what elements were found
- `[LinkedIn Feed Hider] Hidden element: ...` - Shows what was hidden

### Common Issues:

#### No console messages at all
- **Problem:** Extension script isn't loading
- **Solution:**
  - Go to `chrome://extensions/`
  - Click the **Reload** button (circular arrow) on the extension
  - Refresh the LinkedIn page

#### "Found 0 elements" for all selectors
- **Problem:** LinkedIn's HTML structure may have changed
- **Solution:**
  - Take a screenshot of the console output
  - Right-click on a feed post → Inspect
  - Note the class names and share them for an update

#### Extension loaded but nothing hidden
- **Problem:** Selectors don't match current LinkedIn structure
- **Solution:** Continue to Step 3

## Step 3: Manual Inspection

1. Open LinkedIn's homepage
2. Right-click on a feed post
3. Select **Inspect**
4. Look at the HTML structure in DevTools
5. Check if the post has any of these classes:
   - `feed-shared-update-v2`
   - `scaffold-layout__main`
   - `feed-container`
   - `scaffold-finite-scroll`

## Step 4: Force Reload Extension

1. Go to `chrome://extensions/`
2. Find "LinkedIn Feed Hider"
3. Click **Remove**
4. Click **Load unpacked** again
5. Select the extension folder
6. Refresh LinkedIn

## Step 5: Clear Browser Cache

Sometimes cached CSS or JavaScript can interfere:

1. Go to `chrome://settings/privacy`
2. Click **Clear browsing data**
3. Select **Cached images and files**
4. Click **Clear data**
5. Refresh LinkedIn

## Step 6: Check for Conflicts

1. Temporarily disable other extensions
2. Go to `chrome://extensions/`
3. Turn off all other extensions
4. Refresh LinkedIn
5. If it works, re-enable extensions one by one to find the conflict

## Step 7: Verify Manifest Permissions

1. Go to `chrome://extensions/`
2. Click **Details** on LinkedIn Feed Hider
3. Scroll to **Site access**
4. Make sure it says "On specific sites" with `linkedin.com` listed
5. If not, click and set to "On all sites" or add `linkedin.com`

## Step 8: Check Manifest File

Open the `manifest.json` file and verify it contains:

```json
"host_permissions": [
  "*://*.linkedin.com/*"
],
"content_scripts": [
  {
    "matches": ["*://*.linkedin.com/*"],
    "css": ["hide-feed.css"],
    "js": ["content.js"],
    "run_at": "document_start"
  }
]
```

## Getting Help

If none of these steps work, please provide:

1. Screenshot of the Chrome Console showing `[LinkedIn Feed Hider]` messages
2. Screenshot of `chrome://extensions/` showing the extension is enabled
3. Your Chrome version (go to `chrome://version/`)
4. Description of what you see (is the feed partially hidden, not at all, etc.)

## Known Issues

### Feed appears briefly then disappears
- This is expected behavior. The extension runs as fast as possible but LinkedIn loads content dynamically.

### Feed reappears when scrolling
- This shouldn't happen with the MutationObserver, but if it does, refresh the page.

### Works on some LinkedIn pages but not others
- The extension primarily targets the home feed (`linkedin.com/feed`). Other pages should remain unaffected.
