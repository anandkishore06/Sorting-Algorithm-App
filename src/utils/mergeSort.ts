import { 
  AlgorithmStep, 
  ArrayElement, 
  cloneArray, 
  markComparing, 
  markSwapping, 
  markSorted,
  resetVisualStates 
} from './sortingAlgorithms';

export const mergeSort = (array: ArrayElement[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  let currentArray = cloneArray(array);
  
  // Add initial state
  steps.push({
    array: currentArray,
    comparing: [],
    swapping: [],
    sorted: []
  });

  // Keep track of sorted indices globally
  const sortedIndices: number[] = [];

  // Merge sort helper
  const mergeSortHelper = (start: number, end: number): void => {
    // Base case: already sorted
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

    // Find the middle point
    const mid = Math.floor((start + end) / 2);

    // Recursive calls
    mergeSortHelper(start, mid);
    mergeSortHelper(mid + 1, end);

    // Merge the sorted halves
    merge(start, mid, end);
  };

  // Merge function
  const merge = (start: number, mid: number, end: number): void => {
    const tempArray: ArrayElement[] = [];
    let i = start;
    let j = mid + 1;
    
    // Compare and merge
    while (i <= mid && j <= end) {
      // Mark elements being compared
      const comparing = [i, j];
      currentArray = resetVisualStates(currentArray);
      currentArray = markComparing(currentArray, comparing);
      currentArray = markSorted(currentArray, sortedIndices);
      
      steps.push({
        array: currentArray,
        comparing,
        swapping: [],
        sorted: [...sortedIndices]
      });

      if (currentArray[i].value <= currentArray[j].value) {
        tempArray.push({ ...currentArray[i] });
        i++;
      } else {
        tempArray.push({ ...currentArray[j] });
        j++;
      }
    }

    // Add remaining elements from first half
    while (i <= mid) {
      tempArray.push({ ...currentArray[i] });
      i++;
    }

    // Add remaining elements from second half
    while (j <= end) {
      tempArray.push({ ...currentArray[j] });
      j++;
    }

    // Copy back the merged elements
    for (let k = 0; k < tempArray.length; k++) {
      const index = start + k;
      
      // Mark elements being updated
      const swapping = [index];
      currentArray = resetVisualStates(currentArray);
      currentArray = markSwapping(currentArray, swapping);
      currentArray = markSorted(currentArray, sortedIndices);
      
      steps.push({
        array: currentArray,
        comparing: [],
        swapping,
        sorted: [...sortedIndices]
      });

      // Update the element
      currentArray[index] = { ...tempArray[k] };
      
      steps.push({
        array: currentArray,
        comparing: [],
        swapping: [],
        sorted: [...sortedIndices]
      });
    }
    
    // Mark this range as sorted
    for (let k = start; k <= end; k++) {
      if (!sortedIndices.includes(k)) {
        sortedIndices.push(k);
      }
    }
    
    currentArray = resetVisualStates(currentArray);
    currentArray = markSorted(currentArray, sortedIndices);
    
    steps.push({
      array: currentArray,
      comparing: [],
      swapping: [],
      sorted: [...sortedIndices]
    });
  };

  // Start the merge sort
  mergeSortHelper(0, array.length - 1);

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
