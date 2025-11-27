// DOM Inspector Helper
// Run this in the browser console to discover LinkedIn's current class names
// Copy and paste this entire script into the console on LinkedIn's feed page

(function() {
  console.log('=== LinkedIn DOM Inspector ===');
  console.log('Looking for potential feed elements...\n');

  // Find all main containers
  const allDivs = document.querySelectorAll('div');
  const feedCandidates = [];

  // Look for elements that might be the feed
  allDivs.forEach(div => {
    const className = div.className;
    const id = div.id;

    // Check if it looks like a feed container
    if (className && (
      className.includes('feed') ||
      className.includes('main') ||
      className.includes('content') ||
      className.includes('post') ||
      className.includes('update') ||
      className.includes('scaffold')
    )) {
      feedCandidates.push({
        element: div,
        className: className,
        id: id,
        children: div.children.length,
        text: div.innerText?.substring(0, 50)
      });
    }
  });

  console.log(`Found ${feedCandidates.length} potential feed elements:\n`);

  feedCandidates.slice(0, 20).forEach((candidate, index) => {
    console.log(`${index + 1}. Classes: "${candidate.className}"`);
    if (candidate.id) console.log(`   ID: "${candidate.id}"`);
    console.log(`   Children: ${candidate.children}`);
    if (candidate.text) console.log(`   Preview: "${candidate.text}..."`);
    console.log('---');
  });

  // Find the main content area
  console.log('\n=== Main Elements ===');
  const mains = document.querySelectorAll('main');
  console.log(`Found ${mains.length} <main> elements:`);
  mains.forEach((main, i) => {
    console.log(`${i + 1}. Classes: "${main.className}"`);
    console.log(`   ID: "${main.id}"`);
  });

  // Find posts/updates
  console.log('\n=== Potential Post Elements ===');
  const posts = document.querySelectorAll('[class*="post"], [class*="update"], [class*="card"]');
  console.log(`Found ${posts.length} potential post elements`);
  if (posts.length > 0) {
    console.log('First post classes:', posts[0].className);
    console.log('First post element:', posts[0]);
  }

  // Check for data attributes
  console.log('\n=== Data Attributes ===');
  const dataElements = document.querySelectorAll('[data-urn], [data-id]');
  console.log(`Found ${dataElements.length} elements with data-urn or data-id`);
  if (dataElements.length > 0) {
    console.log('Sample:', dataElements[0].outerHTML.substring(0, 200));
  }

  console.log('\n=== INSTRUCTIONS ===');
  console.log('1. Right-click on a feed post and select "Inspect"');
  console.log('2. Look at the HTML structure in DevTools');
  console.log('3. Copy the class names from the post container');
  console.log('4. Share those class names with me');

})();
