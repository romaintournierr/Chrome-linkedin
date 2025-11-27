// LinkedIn Feed Hider - Content Script
// This script ensures the feed is hidden even if loaded dynamically

(function() {
  'use strict';

  // Function to hide feed elements
  function hideFeed() {
    // Main feed selectors
    const feedSelectors = [
      '.scaffold-layout__main',
      'main.scaffold-layout__main',
      '.feed-shared-update-v2',
      '.feed-container',
      '.core-rail',
      '.scaffold-finite-scroll__content',
      '.share-box-feed-entry',
      '.share-box-feed-entry__container'
    ];

    feedSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        // Only hide if it contains feed content
        if (element.classList.contains('scaffold-layout__main') ||
            element.tagName === 'MAIN' ||
            element.classList.contains('feed-shared-update-v2') ||
            element.classList.contains('feed-container') ||
            element.classList.contains('share-box-feed-entry')) {
          element.style.display = 'none';
          element.style.visibility = 'hidden';
        }
      });
    });
  }

  // Run immediately
  hideFeed();

  // Watch for DOM changes (for dynamically loaded content)
  const observer = new MutationObserver((mutations) => {
    hideFeed();
  });

  // Start observing when DOM is ready
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  } else {
    // Wait for body to be available
    document.addEventListener('DOMContentLoaded', () => {
      hideFeed();
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  // Also run on page load
  window.addEventListener('load', hideFeed);
})();
