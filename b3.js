const readline = require("readline");

// For user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function isValid(s) {
  const objPair = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  const arr = [];

  // if empty and bracket is a close bracket return false
  if (s.length === 0 || objPair[s[0]] === undefined) return false;

  for (const char of s) {
    if (objPair[char]) {
      // if an open bracket, push close bracket to list
      arr.push(objPair[char]);
    } else {
      // if a close bracket, check if the last element of close bracket list equal current close bracket
      if (arr.pop() !== char) return false;
    }
  }

  // If all brackets are valid, length will be 0 after popped all element
  return arr.length === 0;
}

function processTestCases(testCases) {
  const result = [];

  for (const testCase of testCases) {
    result.push(isValid(testCase));
  }

  return result;
}

function main() {
  let testCases = [];
  let count = 0;
  let totalTestCases = 0;

  rl.question("Enter the number of test cases: ", (N) => {
    totalTestCases = parseInt(N);
    askBrackets();
  });

  function askBrackets() {
    rl.question(`Enter brackets for test case ${count + 1}: `, (input) => {
      testCases.push(input.trim());
      count++;

      if (count < totalTestCases) {
        askBrackets();
      } else {
        const result = processTestCases(testCases);
        console.log("Results:");

        for (let i = 0; i < result.length; i++) {
          console.log(result[i]);
        }

        rl.close();
      }
    });
  }
}

main();
