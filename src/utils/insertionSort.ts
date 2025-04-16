import { 
  AlgorithmStep, 
  ArrayElement, 
  cloneArray, 
  markComparing, 
  markSwapping, 
  markSorted,
  swapElements,
  resetVisualStates 
} from './sortingAlgorithms';

export const insertionSort = (array: ArrayElement[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const n = array.length;
  let currentArray = cloneArray(array);
  
  // Add initial state
  steps.push({
    array: currentArray,
    comparing: [],
    swapping: [],
    sorted: []
  });

  // Keep track of sorted indices
  const sortedIndices: number[] = [0];
  
  // Mark first element as sorted
  currentArray = markSorted(currentArray, sortedIndices);
  
  steps.push({
    array: currentArray,
    comparing: [],
    swapping: [],
    sorted: sortedIndices
  });

  for (let i = 1; i < n; i++) {
    let j = i;
    
    // Add step to show current element being inserted
    const comparing = [i];
    currentArray = resetVisualStates(currentArray);
    currentArray = markComparing(currentArray, comparing);
    currentArray = markSorted(currentArray, sortedIndices);
    
    steps.push({
      array: currentArray,
      comparing,
      swapping: [],
      sorted: sortedIndices
    });

    // Insert the current element into the sorted part
    while (j > 0 && currentArray[j - 1].value > currentArray[j].value) {
      // Mark elements being compared
      const comparing = [j, j - 1];
      currentArray = resetVisualStates(currentArray);
      currentArray = markComparing(currentArray, comparing);
      currentArray = markSorted(currentArray, sortedIndices.filter(idx => idx !== j)); // Keep previous sorted
      
      steps.push({
        array: currentArray,
        comparing,
        swapping: [],
        sorted: sortedIndices.filter(idx => idx !== j)
      });

      // Mark elements being swapped
      const swapping = [j, j - 1];
      currentArray = markSwapping(currentArray, swapping);
      
      steps.push({
        array: currentArray,
        comparing: [],
        swapping,
        sorted: sortedIndices.filter(idx => idx !== j)
      });

      // Perform the swap
      currentArray = swapElements(currentArray, j, j - 1);
      
      steps.push({
        array: currentArray,
        comparing: [],
        swapping,
        sorted: sortedIndices.filter(idx => idx !== j)
      });

      j--;
    }
    
    // Add the current index to the sorted part
    sortedIndices.push(i);
    // Update sortedIndices to ensure they're in order
    sortedIndices.sort((a, b) => a - b);
    
    currentArray = resetVisualStates(currentArray);
    currentArray = markSorted(currentArray, sortedIndices);
    
    steps.push({
      array: currentArray,
      comparing: [],
      swapping: [],
      sorted: sortedIndices
    });
  }

  return steps;
};
