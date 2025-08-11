function shrinkAds() {
  document.querySelectorAll('span').forEach(span => {
    const text = span.innerText.trim().toLowerCase();

    if (text !== 'promoted') {
      return;
    }

    const post = span.closest('div.feed-shared-update-v2, div.feed-shared-update');
    if (!post || post.classList.contains('ad-shrunk')) {
      return;
    }

    post.classList.add('ad-shrunk');

    // Clear inner content
    post.innerHTML = '';

    // Set height to 1px to prevent the ad from taking up space
    post.style.height = 'auto';
    post.style.padding = '0 8px';
    post.style.backgroundColor = '#ffe5e5';
    post.style.border = '1px solid var(--color-text-low-emphasis, red)';
    post.style.overflow = 'hidden';

    // Add a message to indicate the ad has been removed
    const msg = document.createElement('div');
    msg.innerHTML = 'ad removed - <a href="https://github.com/duxor/linkedIn-feed-cleaner" target="_blank" style="text-decoration:underline; color: var(--color-text-low-emphasis, red)">learn more</a>';
    msg.style.fontSize = '12px';
    msg.style.color = 'var(--color-text-low-emphasis)';
    msg.style.textAlign = 'right';
    msg.style.fontWeight = 'normal';

    post.appendChild(msg);

    console.log('Removed ad:', post);
  });
}

// Run once on page load
shrinkAds();

// Observe for changes in the DOM and run shrinkAds when changes occur
const observer = new MutationObserver(() => shrinkAds());

observer.observe(document.body, { childList: true, subtree: true });
