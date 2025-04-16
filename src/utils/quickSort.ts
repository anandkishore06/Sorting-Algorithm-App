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

export const quickSort = (array: ArrayElement[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
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

  // Quick sort helper
  const quickSortHelper = (start: number, end: number): void => {
    if (start >= end) {
      if (start === end) {
        sortedIndices.push(start);
        currentArray = resetVisualStates(currentArray);
        currentArray = markSorted(currentArray, sortedIndices);
        
        steps.push({
          array: currentArray,
          comparing: [],
          swapping: [],
          sorted: [...sortedIndices]
        });
      }
      return;
    }

    // Partition the array
    const pivotIndex = partition(start, end);

    // Mark pivot as sorted
    sortedIndices.push(pivotIndex);
    currentArray = resetVisualStates(currentArray);
    currentArray = markSorted(currentArray, sortedIndices);
    
    steps.push({
      array: currentArray,
      comparing: [],
      swapping: [],
      sorted: [...sortedIndices]
    });

    // Recursively sort sub-arrays
    quickSortHelper(start, pivotIndex - 1);
    quickSortHelper(pivotIndex + 1, end);
  };

  // Partition function for quick sort
  const partition = (start: number, end: number): number => {
    // Choose the last element as the pivot
    const pivotValue = currentArray[end].value;
    let pivotIndex = start;

    // Mark pivot
    const pivotComparing = [end];
    currentArray = resetVisualStates(currentArray);
    currentArray = markComparing(currentArray, pivotComparing);
    currentArray = markSorted(currentArray, sortedIndices);
    
    steps.push({
      array: currentArray,
      comparing: pivotComparing,
      swapping: [],
      sorted: [...sortedIndices]
    });

    // Partition the array
    for (let i = start; i < end; i++) {
      // Mark elements being compared
      const comparing = [i, end];
      currentArray = resetVisualStates(currentArray);
      currentArray = markComparing(currentArray, comparing);
      currentArray = markSorted(currentArray, sortedIndices);
      
      steps.push({
        array: currentArray,
        comparing,
        swapping: [],
        sorted: [...sortedIndices]
      });

      if (currentArray[i].value <= pivotValue) {
        // Mark elements being swapped
        const swapping = [i, pivotIndex];
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
        currentArray = swapElements(currentArray, i, pivotIndex);
        
        steps.push({
          array: currentArray,
          comparing: [],
          swapping: [],
          sorted: [...sortedIndices]
        });

        pivotIndex++;
      }
    }

    // Place the pivot in the correct position
    const swapping = [end, pivotIndex];
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
    currentArray = swapElements(currentArray, end, pivotIndex);
    
    steps.push({
      array: currentArray,
      comparing: [],
      swapping: [],
      sorted: [...sortedIndices]
    });

    return pivotIndex;
  };

  // Start the quick sort
  quickSortHelper(0, array.length - 1);

  // Mark all elements as sorted in the final step
  const allIndices = Array.from({ length: array.length }, (_, i) => i);
  currentArray = resetVisualStates(currentArray);
  currentArray = markSorted(currentArray, allIndices);
  
  steps.push({
    array: currentArray,
    comparing: [],
    swapping: [],
    sorted: allIndices
  });

  return steps;
};
