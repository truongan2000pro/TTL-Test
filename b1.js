const readline = require("readline");

// For user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to calculate factorial
function factorial(n) {
  if (n === 0 || n === 1) return 1;

  return n * factorial(n - 1);
}

// Function to calculate combinations
function combinations(n, r) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

// Function to count the number of ways to achieve the current score
function countWays(x, y) {
  if (!isNumber(x) || !isNumber(y)) return "Can't calculate";

  return combinations(x + y, x);
}

function countWaysForTestCases(testCases) {
  const result = [];
  for (let i = 0; i < testCases.length; i++) {
    const [x, y] = testCases[i];
    result.push(countWays(x, y));
  }

  return result;
}

function isNumber(value) {
  return typeof value === "number";
}

function main() {
  let testCases = [];
  let count = 0;
  let totalTestCases = 0;

  rl.question("Enter the number of test cases: ", (N) => {
    totalTestCases = parseInt(N);
    askScores();
  });

  function askScores() {
    rl.question(`Enter score for test case ${count + 1}: `, (input) => {
      // Split space and convert all user input to number
      const [x, y] = input.trim().split(" ").map(Number);

      testCases.push([x, y]);
      count++;

      if (count < totalTestCases) {
        askScores();
      } else {
        const result = countWaysForTestCases(testCases);
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

/*
Example combinations of team TT score 2 goals and team TTL score 2 goals

TT:2 TTL:2
TTL:2 TT:2

TT:1 TTL:2 TT:1
TTL:1 TT:2 TTL:1

TT:1 TTL:1 TT:1 TTL:1
TT:1 TTL:1 TTL:1 TT:1
*/
