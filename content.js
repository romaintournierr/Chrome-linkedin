// LinkedIn Feed Hider - Content Script
// This script ensures the feed is hidden even if loaded dynamically

(function() {
  'use strict';

  console.log('[LinkedIn Feed Hider] Extension loaded');

  let feedHiddenCount = 0;
  let indicatorShown = false;

  // Function to create and show indicator
  function showIndicator() {
    // Only show once per page load
    if (indicatorShown) return;

    // Check if we're on the feed page (home page)
    const isOnFeedPage = window.location.pathname === '/feed/' ||
                         window.location.pathname === '/' ||
                         window.location.pathname === '' ||
                         window.location.href.includes('linkedin.com/feed');

    console.log('[LinkedIn Feed Hider] Checking indicator display:', {
      isOnFeedPage,
      pathname: window.location.pathname,
      feedHiddenCount
    });

    if (!isOnFeedPage || feedHiddenCount === 0) return;

    indicatorShown = true;
    console.log('[LinkedIn Feed Hider] Showing indicator');

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
    console.log('[LinkedIn Feed Hider] Running hideFeed()');

    // More comprehensive feed selectors
    const feedSelectors = [
      // Main content area
      '.scaffold-layout__main',
      'main.scaffold-layout__main',

      // Feed updates
      '.feed-shared-update-v2',
      '[data-id^="urn:li:activity"]',

      // Feed containers
      '.feed-container',
      '.core-rail',
      '.scaffold-finite-scroll',
      '.scaffold-finite-scroll__content',

      // Share box
      '.share-box-feed-entry',
      '.share-box-feed-entry__container',
      '.share-box',

      // Additional feed elements
      'div[class*="feed"]',
      '.artdeco-card:has(.feed-shared-update-v2)'
    ];

    let hiddenThisRun = 0;

    feedSelectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        console.log(`[LinkedIn Feed Hider] Found ${elements.length} elements for selector: ${selector}`);

        elements.forEach(element => {
          // Check if element is part of the feed (not navigation, sidebar, etc.)
          const isNavigation = element.closest('nav, header, .global-nav');
          const isSidebar = element.closest('.scaffold-layout__aside, .scaffold-layout__sidebar');
          const isMessaging = element.closest('.msg-overlay-list-bubble, .messaging-container');

          if (isNavigation || isSidebar || isMessaging) {
            console.log('[LinkedIn Feed Hider] Skipping element (navigation/sidebar/messaging)');
            return;
          }

          // Hide the element if it's likely feed content
          const shouldHide =
            element.classList.contains('scaffold-layout__main') ||
            element.tagName === 'MAIN' ||
            element.classList.contains('feed-shared-update-v2') ||
            element.classList.contains('feed-container') ||
            element.classList.contains('share-box-feed-entry') ||
            element.classList.contains('share-box') ||
            element.classList.contains('scaffold-finite-scroll') ||
            (element.hasAttribute('data-id') && element.getAttribute('data-id').includes('urn:li:activity'));

          if (shouldHide && element.style.display !== 'none') {
            element.style.setProperty('display', 'none', 'important');
            element.style.setProperty('visibility', 'hidden', 'important');
            hiddenThisRun++;
            console.log('[LinkedIn Feed Hider] Hidden element:', element.className || element.tagName);
          }
        });
      } catch (e) {
        console.error('[LinkedIn Feed Hider] Error processing selector:', selector, e);
      }
    });

    console.log(`[LinkedIn Feed Hider] Hidden ${hiddenThisRun} elements this run`);

    if (hiddenThisRun > 0) {
      feedHiddenCount += hiddenThisRun;
      // Show indicator after a short delay to ensure page is loaded
      setTimeout(showIndicator, 1000);
    }
  }

  // Initialize
  function init() {
    console.log('[LinkedIn Feed Hider] Initializing...');

    // Run immediately if body exists
    if (document.body) {
      hideFeed();
    }

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
      console.log('[LinkedIn Feed Hider] MutationObserver started');
    } else {
      // Wait for body to be available
      document.addEventListener('DOMContentLoaded', () => {
        console.log('[LinkedIn Feed Hider] DOMContentLoaded fired');
        hideFeed();
        if (document.body) {
          observer.observe(document.body, {
            childList: true,
            subtree: true
          });
          console.log('[LinkedIn Feed Hider] MutationObserver started (delayed)');
        }
      });
    }

    // Also run on page load
    window.addEventListener('load', () => {
      console.log('[LinkedIn Feed Hider] Window loaded');
      hideFeed();
    });
  }

  // Start the extension
  init();
})();
