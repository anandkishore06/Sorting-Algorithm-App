
// Sorting algorithm types and utilities

export type ArrayElement = {
  value: number;
  isComparing: boolean;
  isSwapping: boolean;
  isSorted: boolean;
};

export type AlgorithmStep = {
  array: ArrayElement[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
};

export type SortingAlgorithm = 
  | "bubble" 
  | "selection" 
  | "insertion" 
  | "merge" 
  | "quick" 
  | "heap";

// Create a new array element
export const createArrayElement = (value: number): ArrayElement => ({
  value,
  isComparing: false,
  isSwapping: false,
  isSorted: false,
});

// Clone an array to avoid mutating the original
export const cloneArray = (array: ArrayElement[]): ArrayElement[] =>
  array.map(element => ({ ...element }));

// Reset all visual states (comparing, swapping, sorted)
export const resetVisualStates = (array: ArrayElement[]): ArrayElement[] =>
  array.map(element => ({
    ...element,
    isComparing: false,
    isSwapping: false,
    isSorted: false,
  }));

// Function to mark elements as comparing
export const markComparing = (array: ArrayElement[], indices: number[]): ArrayElement[] => {
  const newArray = cloneArray(array);
  indices.forEach(index => {
    if (index >= 0 && index < newArray.length) {
      newArray[index] = { ...newArray[index], isComparing: true };
    }
  });
  return newArray;
};

// Function to mark elements as swapping
export const markSwapping = (array: ArrayElement[], indices: number[]): ArrayElement[] => {
  const newArray = cloneArray(array);
  indices.forEach(index => {
    if (index >= 0 && index < newArray.length) {
      newArray[index] = { ...newArray[index], isSwapping: true };
    }
  });
  return newArray;
};

// Function to mark elements as sorted
export const markSorted = (array: ArrayElement[], indices: number[]): ArrayElement[] => {
  const newArray = cloneArray(array);
  indices.forEach(index => {
    if (index >= 0 && index < newArray.length) {
      newArray[index] = { ...newArray[index], isSorted: true };
    }
  });
  return newArray;
};

// Helper to swap two elements in an array
export const swapElements = (array: ArrayElement[], i: number, j: number): ArrayElement[] => {
  const newArray = cloneArray(array);
  const temp = newArray[i];
  newArray[i] = newArray[j];
  newArray[j] = temp;
  return newArray;
};

// Generate random array of specified length
export const generateRandomArray = (length: number): ArrayElement[] => {
  const array: ArrayElement[] = [];
  for (let i = 0; i < length; i++) {
    array.push(createArrayElement(Math.floor(Math.random() * 100) + 1));
  }
  return array;
};
