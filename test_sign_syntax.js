const fs = require('fs');
const content = fs.readFileSync('sign.html', 'utf8');

// Check if there are any syntax errors
try {
  // Extract all JS code
  const regex = /<script>([\s\S]*?)<\/script>/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
      new Function(match[1]); // This will throw an error if syntax is invalid
  }
  console.log('No syntax errors found in sign.html!');
} catch (e) {
  console.log('Syntax Error in sign.html:', e.message);
}
