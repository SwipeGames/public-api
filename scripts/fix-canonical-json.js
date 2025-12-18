#!/usr/bin/env node

/**
 * Post-processes generated API documentation to ensure all JSON examples
 * are in canonical format (alphabetically sorted keys, compact).
 *
 * This script:
 * 1. Reads all .api.mdx files from docs/core and docs/swipegames-integration
 * 2. Finds JSON blocks in code examples (cURL, JavaScript, Python, etc.)
 * 3. Sorts all JSON object keys alphabetically (recursively)
 * 4. Writes the fixed content back to the files
 */

const fs = require('fs');
const path = require('path');

/**
 * Recursively sort object keys alphabetically
 */
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

/**
 * Process a single MDX file
 */
function processFile(filePath) {
  console.log(`Processing: ${filePath}`);

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Match JSON blocks in various code samples
  // This regex finds JSON objects in -d flags for cURL commands
  const curlJsonRegex = /-d\s+'({[\s\S]*?})'/g;

  content = content.replace(curlJsonRegex, (match, jsonStr) => {
    try {
      // Parse and re-serialize with sorted keys
      const parsed = JSON.parse(jsonStr);
      const sorted = sortObjectKeys(parsed);
      const canonical = JSON.stringify(sorted, null, 2);
      modified = true;
      return `-d '${canonical}'`;
    } catch (e) {
      console.warn(`  Warning: Could not parse JSON in cURL: ${e.message}`);
      return match;
    }
  });

  // Also handle -d with double quotes
  const curlJsonRegex2 = /-d\s+"({[\s\S]*?})"/g;
  content = content.replace(curlJsonRegex2, (match, jsonStr) => {
    try {
      const parsed = JSON.parse(jsonStr);
      const sorted = sortObjectKeys(parsed);
      const canonical = JSON.stringify(sorted, null, 2);
      modified = true;
      return `-d "${canonical}"`;
    } catch (e) {
      console.warn(`  Warning: Could not parse JSON in cURL: ${e.message}`);
      return match;
    }
  });

  // Handle JSON in code blocks (JavaScript, Python, etc.)
  // Look for JSON.stringify or json.dumps calls with object literals
  const jsObjectRegex = /(\w+\.stringify\s*\(\s*)({[\s\S]*?})(\s*,|\s*\))/g;
  content = content.replace(jsObjectRegex, (match, prefix, jsonStr, suffix) => {
    try {
      const parsed = JSON.parse(jsonStr);
      const sorted = sortObjectKeys(parsed);
      const canonical = JSON.stringify(sorted, null, 2);
      modified = true;
      return `${prefix}${canonical}${suffix}`;
    } catch (e) {
      console.warn(`  Warning: Could not parse JSON in JS: ${e.message}`);
      return match;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Fixed canonical JSON formatting`);
  } else {
    console.log(`  - No changes needed`);
  }
}

/**
 * Process all .api.mdx files in a directory
 */
function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory not found: ${dirPath}`);
    return;
  }

  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    if (file.endsWith('.api.mdx')) {
      const filePath = path.join(dirPath, file);
      processFile(filePath);
    }
  });
}

// Main execution
console.log('=== Fixing Canonical JSON in API Documentation ===\n');

const coreDocsPath = path.join(__dirname, '../docs/core');
const integrationDocsPath = path.join(__dirname, '../docs/swipegames-integration');

console.log('Processing Core API docs...');
processDirectory(coreDocsPath);

console.log('\nProcessing Integration API docs...');
processDirectory(integrationDocsPath);

console.log('\n=== Done! ===');
