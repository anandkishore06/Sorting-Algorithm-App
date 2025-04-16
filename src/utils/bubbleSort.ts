
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

export const bubbleSort = (array: ArrayElement[]): AlgorithmStep[] => {
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

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Mark elements being compared
      const comparing = [j, j + 1];
      currentArray = resetVisualStates(currentArray);
      currentArray = markComparing(currentArray, comparing);
      
      steps.push({
        array: currentArray,
        comparing,
        swapping: [],
        sorted: []
      });

      // If elements need to be swapped
      if (currentArray[j].value > currentArray[j + 1].value) {
        const swapping = [j, j + 1];
        currentArray = markSwapping(currentArray, swapping);
        
        steps.push({
          array: currentArray,
          comparing: [],
          swapping,
          sorted: []
        });

        // Perform the swap
        currentArray = swapElements(currentArray, j, j + 1);
        
        steps.push({
          array: currentArray,
          comparing: [],
          swapping,
          sorted: []
        });
      }
    }
    
    // Mark the last n-i-1 element as sorted
    const sortedIndex = n - i - 1;
    currentArray = resetVisualStates(currentArray);
    currentArray = markSorted(currentArray, [sortedIndex]);
    
    // Also mark all previously sorted elements
    for (let k = sortedIndex + 1; k < n; k++) {
      currentArray = markSorted(currentArray, [k]);
    }
    
    steps.push({
      array: currentArray,
      comparing: [],
      swapping: [],
      sorted: [sortedIndex]
    });
  }

  // Mark all elements as sorted in the final step
  currentArray = resetVisualStates(currentArray);
  const allIndices = Array.from({ length: n }, (_, i) => i);
  currentArray = markSorted(currentArray, allIndices);
  
  steps.push({
    array: currentArray,
    comparing: [],
    swapping: [],
    sorted: allIndices
  });

  return steps;
};
