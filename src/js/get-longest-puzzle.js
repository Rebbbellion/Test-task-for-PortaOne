function findTheLongestPuzzle(puzzlesArray) {
  const puzzlesGraph = mapArrayToGraph(puzzlesArray);
  const memory = new Map();
  let longestPuzzle = "";

  for (const puzzle of puzzlesArray) {
    const currentPuzzle = gatherPuzzle(puzzle, puzzlesGraph, memory);

    if (currentPuzzle.length > longestPuzzle.length) {
      longestPuzzle = currentPuzzle;
    }
  }

  return longestPuzzle;
}

function mapArrayToGraph(array) {
  const hashTable = new Map();
  const graph = {};

  //Group puzzles by first two digits
  for (const puzzle of array) {
    const key = puzzle.slice(0, 2);
    if (!hashTable.has(key)) {
      hashTable.set(key, []);
    }
    hashTable.get(key).push(puzzle);
  }

  //Build the graph using the last two digits as a key
  for (const puzzle of array) {
    const key = puzzle.slice(-2);
    graph[puzzle] = hashTable.get(key) || [];
  }

  return graph;
}

function gatherPuzzle(puzzle, graph, memory) {
  const stack = [{ puzzle, gatheredPuzzle: puzzle }];
  let longestPuzzle = puzzle;
  const usedPuzzles = new Set();
  const parentsPath = {};

  while (stack.length > 0) {
    const { puzzle: currentPuzzle, gatheredPuzzle } = stack.pop();

    //Using memory if we've already gathered puzzle earlier
    if (memory.has(currentPuzzle)) {
      const combinedPuzzle =
        gatheredPuzzle + memory.get(currentPuzzle).slice(6);
      //Removing repeating part of puzzle in memory which already exists in gatheredPuzzle

      if (combinedPuzzle.length > longestPuzzle.length) {
        longestPuzzle = combinedPuzzle;
      }
      continue;
    }

    if (gatheredPuzzle.length > longestPuzzle.length) {
      longestPuzzle = gatheredPuzzle;
    }

    for (const childPuzzle of graph[currentPuzzle]) {
      if (!usedPuzzles.has(childPuzzle)) {
        stack.push({
          puzzle: childPuzzle,
          gatheredPuzzle: gatheredPuzzle + childPuzzle.slice(2), // Skip first two digits to concatenate the puzzle
        });
        parentsPath[childPuzzle] = currentPuzzle; // Creating parent-child relationship to fill up memory later
      }
    }

    usedPuzzles.add(currentPuzzle);
  }

  //Filling up memory using existing parent—child relationships
  fillUpMemory(parentsPath, memory);

  memory.set(puzzle, longestPuzzle);

  return longestPuzzle;
}

function fillUpMemory(parentsPath, memory) {
  Object.entries(parentsPath).forEach(([childKey, parentValue]) => {
    let combinedPuzzle = memory.get(childKey)
      ? parentValue + memory.get(childKey).slice(2)
      : parentValue + childKey.slice(2);
    memory.set(parentValue, combinedPuzzle);
  });
}

export { findTheLongestPuzzle };
