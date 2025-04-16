
import { bubbleSort } from './bubbleSort';
import { selectionSort } from './selectionSort';
import { insertionSort } from './insertionSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';
import { heapSort } from './heapSort';
import { ArrayElement, AlgorithmStep, SortingAlgorithm } from './sortingAlgorithms';

// Get algorithm info
export const getAlgorithmInfo = (algorithm: SortingAlgorithm): { name: string; description: string; timeComplexity: string; spaceComplexity: string } => {
  switch (algorithm) {
    case 'bubble':
      return {
        name: 'Bubble Sort',
        description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)'
      };
    case 'selection':
      return {
        name: 'Selection Sort',
        description: 'Repeatedly finds the minimum element from the unsorted part and puts it at the beginning.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)'
      };
    case 'insertion':
      return {
        name: 'Insertion Sort',
        description: 'Builds the sorted array one item at a time by comparing each with the items before it.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)'
      };
    case 'merge':
      return {
        name: 'Merge Sort',
        description: 'Divides the array into halves, sorts them, then merges them back together.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)'
      };
    case 'quick':
      return {
        name: 'Quick Sort',
        description: 'Selects a pivot element and partitions the array around it, then recursively sorts the sub-arrays.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(log n)'
      };
    case 'heap':
      return {
        name: 'Heap Sort',
        description: 'Builds a max-heap from the data, then repeatedly extracts the maximum element.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1)'
      };
    default:
      return {
        name: 'Unknown Algorithm',
        description: 'No description available.',
        timeComplexity: 'Unknown',
        spaceComplexity: 'Unknown'
      };
  }
};

// Get sorting steps based on algorithm
export const getSortingSteps = (algorithm: SortingAlgorithm, array: ArrayElement[]): AlgorithmStep[] => {
  switch (algorithm) {
    case 'bubble':
      return bubbleSort(array);
    case 'selection':
      return selectionSort(array);
    case 'insertion':
      return insertionSort(array);
    case 'merge':
      return mergeSort(array);
    case 'quick':
      return quickSort(array);
    case 'heap':
      return heapSort(array);
    default:
      return [{
        array,
        comparing: [],
        swapping: [],
        sorted: []
      }];
  }
};
