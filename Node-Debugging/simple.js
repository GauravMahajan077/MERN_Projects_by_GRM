// debug-demo.js

const fs = require('fs');

// Global variable
let counter = 0;

// Function with parameters and return value
function multiply(a, b) {
  const result = a * b;
  return result;
}

// Async function with Promise
async function readFileAsync(path) {
  try {
    const data = await fs.promises.readFile(path, 'utf8');
    console.log("File content:", data);
  } catch (err) {
    console.error("Error reading file:", err.message);
  }
}

// Loop and conditional
function processNumbers(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    counter++;
    if (numbers[i] % 2 === 0) {
      console.log(`Even number: ${numbers[i]}`);
    } else {
      console.log(`Odd number: ${numbers[i]}`);
    }
  }
}

// Trigger everything
function main() {
  const nums = [1, 2, 3, 4, 5];
  processNumbers(nums);

  const product = multiply(6, 7);
  console.log("Product:", product);

  readFileAsync('./sample.txt'); // Make sure this file exists
}

main();