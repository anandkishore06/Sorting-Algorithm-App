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

export const heapSort = (array: ArrayElement[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  let currentArray = cloneArray(array);
  const n = array.length;
  
  // Add initial state
  steps.push({
    array: currentArray,
    comparing: [],
    swapping: [],
    sorted: []
  });

  // Keep track of sorted indices
  const sortedIndices: number[] = [];

  // Heapify helper function
  const heapify = (n: number, i: number): void => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // Compare with left child
    if (left < n) {
      const comparing = [largest, left];
      currentArray = resetVisualStates(currentArray);
      currentArray = markComparing(currentArray, comparing);
      currentArray = markSorted(currentArray, sortedIndices);
      
      steps.push({
        array: currentArray,
        comparing,
        swapping: [],
        sorted: [...sortedIndices]
      });

      if (currentArray[left].value > currentArray[largest].value) {
        largest = left;
      }
    }

    // Compare with right child
    if (right < n) {
      const comparing = [largest, right];
      currentArray = resetVisualStates(currentArray);
      currentArray = markComparing(currentArray, comparing);
      currentArray = markSorted(currentArray, sortedIndices);
      
      steps.push({
        array: currentArray,
        comparing,
        swapping: [],
        sorted: [...sortedIndices]
      });

      if (currentArray[right].value > currentArray[largest].value) {
        largest = right;
      }
    }

    // If largest is not the root
    if (largest !== i) {
      // Mark elements being swapped
      const swapping = [i, largest];
      currentArray = resetVisualStates(currentArray);
      currentArray = markSwapping(currentArray, swapping);
      currentArray = markSorted(currentArray, sortedIndices);
      
      steps.push({
        array: currentArray,
        comparing: [],
        swapping,
        sorted: [...sortedIndices]
      });

      // Swap elements
      currentArray = swapElements(currentArray, i, largest);
      
      steps.push({
        array: currentArray,
        comparing: [],
        swapping: [],
        sorted: [...sortedIndices]
      });

      // Heapify the affected sub-tree
      heapify(n, largest);
    }
  };

  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    const swapping = [0, i];
    currentArray = resetVisualStates(currentArray);
    currentArray = markSwapping(currentArray, swapping);
    currentArray = markSorted(currentArray, sortedIndices);
    
    steps.push({
      array: currentArray,
      comparing: [],
      swapping,
      sorted: [...sortedIndices]
    });

    // Swap elements
    currentArray = swapElements(currentArray, 0, i);
    
    steps.push({
      array: currentArray,
      comparing: [],
      swapping,
      sorted: [...sortedIndices]
    });

    // Mark the current element as sorted
    sortedIndices.push(i);
    currentArray = resetVisualStates(currentArray);
    currentArray = markSorted(currentArray, sortedIndices);
    
    steps.push({
      array: currentArray,
      comparing: [],
      swapping: [],
      sorted: [...sortedIndices]
    });

    // Call heapify on the reduced heap
    heapify(i, 0);
  }

  // Mark the last element as sorted
  sortedIndices.push(0);
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
