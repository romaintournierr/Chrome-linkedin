// LinkedIn Feed Hider - Content Script
// This script ensures the feed is hidden even if loaded dynamically

(function() {
  'use strict';

  let feedHiddenCount = 0;
  let indicatorShown = false;

  // Function to create and show indicator
  function showIndicator() {
    // Only show once per page load
    if (indicatorShown) return;

    // Check if we're on the feed page (home page)
    const isOnFeedPage = window.location.pathname === '/feed/' ||
                         window.location.pathname === '/' ||
                         window.location.pathname === '';

    if (!isOnFeedPage || feedHiddenCount === 0) return;

    indicatorShown = true;

    const indicator = document.createElement('div');
    indicator.id = 'linkedin-feed-hider-indicator';
    indicator.innerHTML = `
      <div class="lfh-indicator-content">
        <span class="lfh-indicator-icon">✓</span>
        <span class="lfh-indicator-text">LinkedIn Feed Hidden</span>
        <button class="lfh-indicator-close" aria-label="Close">&times;</button>
      </div>
    `;

    document.body.appendChild(indicator);

    // Close button functionality
    const closeBtn = indicator.querySelector('.lfh-indicator-close');
    closeBtn.addEventListener('click', () => {
      indicator.style.opacity = '0';
      setTimeout(() => indicator.remove(), 300);
    });

    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.style.opacity = '0';
        setTimeout(() => {
          if (indicator.parentNode) {
            indicator.remove();
          }
        }, 300);
      }
    }, 5000);
  }

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

    let hiddenThisRun = 0;

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
          hiddenThisRun++;
        }
      });
    });

    if (hiddenThisRun > 0) {
      feedHiddenCount += hiddenThisRun;
      // Show indicator after a short delay to ensure page is loaded
      setTimeout(showIndicator, 1000);
    }
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
