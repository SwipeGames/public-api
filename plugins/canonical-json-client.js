/**
 * Client-side module to intercept and fix JSON formatting in code samples
 */

// Recursively sort object keys
function sortObjectKeys(obj) {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return obj;
  }

  const sorted = {};
  Object.keys(obj)
    .sort()
    .forEach(key => {
      sorted[key] = sortObjectKeys(obj[key]);
    });

  return sorted;
}

// Override JSON.stringify to always sort keys
const originalStringify = JSON.stringify;
JSON.stringify = function(value, replacer, space) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    value = sortObjectKeys(value);
  }
  return originalStringify.call(this, value, replacer, space);
};

// Post-process code samples after they're rendered
if (typeof window !== 'undefined') {
  console.log('[Canonical JSON Plugin] Loaded - JSON.stringify will sort keys alphabetically');

  let isProcessing = false;
  let processedBlocks = new WeakSet();

  // Run as early as possible - when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Run immediately when DOM is ready
      setTimeout(fixCurlExamples, 0);
      // Run again after a short delay to catch late-rendered content
      setTimeout(fixCurlExamples, 100);
    });
  } else {
    // DOM already loaded, run immediately
    setTimeout(fixCurlExamples, 0);
    setTimeout(fixCurlExamples, 100);
  }

  // Also run on full page load as a fallback
  window.addEventListener('load', () => {
    setTimeout(fixCurlExamples, 0);
    setTimeout(fixCurlExamples, 200);

    // Use MutationObserver to catch dynamically loaded content
    const observer = new MutationObserver((mutations) => {
      // Debounce - only run after mutations have settled
      clearTimeout(window.curlFixTimeout);
      window.curlFixTimeout = setTimeout(() => {
        if (!isProcessing) {
          fixCurlExamples();
        }
      }, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });

  function fixCurlExamples() {
    if (isProcessing) return;
    isProcessing = true;

    try {
      // Find all code blocks
      const codeBlocks = document.querySelectorAll('pre code, .prism-code');

      codeBlocks.forEach(block => {
        // Skip if block is being removed or already processed
        if (!block.isConnected || processedBlocks.has(block)) return;

        try {
          // Get both text content and HTML to preserve structure
          const content = block.textContent || block.innerText;
          const html = block.innerHTML;

          // Check if this is a cURL command with JSON
          if (content.includes('curl') && content.includes('-d')) {
            // Match JSON in -d flag in the text content
            const jsonMatch = content.match(/-d\s+['"](\{[\s\S]*?\})['"]/);

            if (jsonMatch) {
              try {
                // Parse the JSON
                const jsonStr = jsonMatch[1];
                const parsed = JSON.parse(jsonStr);

                // Check if already compact (no whitespace/newlines)
                if (!/[\n\r\s]{2,}/.test(jsonStr)) {
                  processedBlocks.add(block);
                  return; // Already canonical
                }

                // Sort keys and create compact JSON (no whitespace)
                const sorted = sortObjectKeys(parsed);
                const compact = JSON.stringify(sorted);

                // Escape special HTML characters in the compact JSON
                const escapedCompact = compact
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');

                // Escape special HTML characters in the original JSON for matching
                const escapedJsonStr = jsonStr
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');

                // Try to preserve HTML structure by replacing in innerHTML
                let newHtml = html;

                // Look for the JSON in HTML (might be across multiple spans/elements)
                // Replace with a more flexible approach
                if (html.includes('{')) {
                  // Find the opening brace position
                  const openBrace = html.indexOf('{');
                  if (openBrace > -1) {
                    // Extract everything from { to }
                    let depth = 0;
                    let closeBrace = -1;
                    for (let i = openBrace; i < html.length; i++) {
                      const char = html[i];
                      if (char === '{' && (i === openBrace || html[i-1] !== '\\')) depth++;
                      if (char === '}' && html[i-1] !== '\\') {
                        depth--;
                        if (depth === 0) {
                          closeBrace = i;
                          break;
                        }
                      }
                    }

                    if (closeBrace > -1) {
                      // Replace the JSON part (stripping any HTML tags within)
                      newHtml = html.substring(0, openBrace) + compact + html.substring(closeBrace + 1);
                    }
                  }
                }

                // Update the code block safely
                if (block.isConnected && newHtml !== html) {
                  block.innerHTML = newHtml;

                  // Mark as processed
                  processedBlocks.add(block);

                  console.log('[Canonical JSON Plugin] Fixed cURL example to use compact canonical JSON');
                }
              } catch (e) {
                // JSON parse error, skip this block
                processedBlocks.add(block);
              }
            }
          }
        } catch (e) {
          // DOM error (element being removed), skip silently
          console.debug('[Canonical JSON Plugin] Skipped block due to DOM error:', e.message);
        }
      });
    } catch (e) {
      console.error('[Canonical JSON Plugin] Error in fixCurlExamples:', e);
    } finally {
      isProcessing = false;
    }
  }
}
