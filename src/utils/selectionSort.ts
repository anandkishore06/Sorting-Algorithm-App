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

export const selectionSort = (array: ArrayElement[]): AlgorithmStep[] => {
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
  const sortedIndices: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    // Find the minimum element in the unsorted part
    for (let j = i + 1; j < n; j++) {
      // Mark elements being compared
      const comparing = [minIndex, j];
      currentArray = resetVisualStates(currentArray);
      currentArray = markComparing(currentArray, comparing);
      
      // Mark already sorted elements
      currentArray = markSorted(currentArray, sortedIndices);
      
      steps.push({
        array: currentArray,
        comparing,
        swapping: [],
        sorted: sortedIndices
      });

      // Update minimum index if a smaller element is found
      if (currentArray[j].value < currentArray[minIndex].value) {
        minIndex = j;
      }
    }

    // Swap the minimum element with the first element of the unsorted part
    if (minIndex !== i) {
      const swapping = [i, minIndex];
      currentArray = resetVisualStates(currentArray);
      currentArray = markSwapping(currentArray, swapping);
      currentArray = markSorted(currentArray, sortedIndices);
      
      steps.push({
        array: currentArray,
        comparing: [],
        swapping,
        sorted: sortedIndices
      });

      // Perform the swap
      currentArray = swapElements(currentArray, i, minIndex);
      
      steps.push({
        array: currentArray,
        comparing: [],
        swapping,
        sorted: sortedIndices
      });
    }
    
    // Mark the current element as sorted
    sortedIndices.push(i);
    currentArray = resetVisualStates(currentArray);
    currentArray = markSorted(currentArray, sortedIndices);
    
    steps.push({
      array: currentArray,
      comparing: [],
      swapping: [],
      sorted: sortedIndices
    });
  }

  // Mark all elements as sorted in the final step
  sortedIndices.push(n - 1);
  currentArray = resetVisualStates(currentArray);
  currentArray = markSorted(currentArray, sortedIndices);
  
  steps.push({
    array: currentArray,
    comparing: [],
    swapping: [],
    sorted: sortedIndices
  });

  return steps;
};
