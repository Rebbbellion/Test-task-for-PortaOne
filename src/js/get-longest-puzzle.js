function findTheLongestPuzzle(puzzlesArray) {
  const puzzlesGraph = mapArrayToGraph(puzzlesArray);
  let longestPuzzle = "";

  for (const puzzle of puzzlesArray) {
    const currentPuzzle = gatherPuzzle(puzzle, puzzlesGraph);

    if (currentPuzzle.length > longestPuzzle.length) {
      longestPuzzle = currentPuzzle;
    }
  }

  return longestPuzzle;
}

function mapArrayToGraph(array) {
  const hashTable = new Map();
  const graph = {};

  // Group puzzles by first two digits
  for (const puzzle of array) {
    const key = puzzle.slice(0, 2);
    if (!hashTable.has(key)) {
      hashTable.set(key, []);
    }
    hashTable.get(key).push(puzzle);
  }

  // Build the graph using the last two digits as a key
  for (const puzzle of array) {
    const key = puzzle.slice(-2);
    graph[puzzle] = hashTable.get(key) || [];
  }

  return graph;
}

function gatherPuzzle(
  puzzle,
  graph,
  gatheredPuzzle = puzzle,
  usedPuzzles = new Set()
) {
  usedPuzzles.add(puzzle);

  let longestPuzzle = gatheredPuzzle;

  for (const childPuzzle of graph[puzzle]) {
    if (!usedPuzzles.has(childPuzzle)) {
      const combinedPuzzle = gatheredPuzzle + childPuzzle.slice(2);
      const result = gatherPuzzle(
        childPuzzle,
        graph,
        combinedPuzzle,
        usedPuzzles
      );
      if (result.length > longestPuzzle.length) {
        longestPuzzle = result;
      }
    }
  }

  return longestPuzzle;
}

export { findTheLongestPuzzle };
