const readline = require("readline");

// For user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function calculateGold(m, d, k, c) {
  // If k is bigger than d so player can't kill any monster and if d equal k and monster > 1 player will have no weapon left => loose
  if (k > d || (d - k === 0 && m > 1)) return -1;

  // Calculate the number of monsters can kill before needing to repair
  const monstersBeforeRepair = Math.floor(d / k);

  // If can kill all monsters before needing to repair
  if (monstersBeforeRepair >= m) {
    return 0; // No gold needed
  }

  let totalGoldNeeded = 0;
  let remainingDurability = d;
  let remainingMonsters = m;

  // Kill monsters until durability is 1 or there are no more monsters
  for (let i = 0; i < m; i++) {
    remainingMonsters -= remainingDurability - 1;
    remainingDurability -= remainingDurability - 1;

    // If durability becomes 1, repair it
    if (remainingDurability === 1) {
      totalGoldNeeded += c;
      remainingDurability = d;

      if (remainingMonsters <= remainingDurability) break;
    }
  }

  return totalGoldNeeded;
}

function main() {
  rl.question("Enter the values of m, d, k, c separated by space: ", (input) => {
    const [m, d, k, c] = input.split(" ").map(Number);

    const goldNeeded = calculateGold(m, d, k, c);
    console.log(goldNeeded);

    rl.close();
  });
}

main();

/*
Test with calculateGold(10, 3, 1, 2);

1st d: 3, kill 2 monster, cost: 0 gold, remain m: 8
2nd d: 3, kill 2 monster, cost: 2 gold, remain m: 6
3rd d: 3, kill 2 monster, cost: 4 gold, remain m: 4
4th d: 3, kill 2 monster, cost: 6 gold, remain m: 2
5th d: 3, kill 2 monster, cost: 8 gold, remain m: 0
*/
