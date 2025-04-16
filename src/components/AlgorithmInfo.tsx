
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SortingAlgorithm } from '@/utils/sortingAlgorithms';
import { getAlgorithmInfo } from '@/utils/sortingUtils';

interface AlgorithmInfoProps {
  algorithm: SortingAlgorithm;
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithm }) => {
  const info = getAlgorithmInfo(algorithm);

  // Get detailed description based on algorithm
  const getDetailedDescription = () => {
    switch (algorithm) {
      case 'bubble':
        return (
          <div className="space-y-2">
            <p>Bubble Sort is one of the simplest sorting algorithms. It works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order.</p>
            <p>The algorithm gets its name because smaller elements "bubble" to the top of the list.</p>
            <p><strong>Process:</strong></p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Compare adjacent elements. If the first is greater than the second, swap them.</li>
              <li>Do this for each pair of adjacent elements, from the beginning to the end.</li>
              <li>After each iteration, the largest element will be at the end of the array.</li>
              <li>Repeat the process for all elements except the last one.</li>
              <li>Continue until no more swaps are needed.</li>
            </ol>
          </div>
        );
      
      case 'selection':
        return (
          <div className="space-y-2">
            <p>Selection Sort is an in-place comparison sorting algorithm. It divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted.</p>
            <p><strong>Process:</strong></p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Find the minimum element in the unsorted part of the array.</li>
              <li>Swap it with the element at the beginning of the unsorted part.</li>
              <li>Move the boundary between the sorted and unsorted parts one element to the right.</li>
              <li>Repeat until the entire array is sorted.</li>
            </ol>
          </div>
        );
      
      case 'insertion':
        return (
          <div className="space-y-2">
            <p>Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.</p>
            <p><strong>Process:</strong></p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Start with the second element.</li>
              <li>Compare it with elements before it and insert it at the correct position.</li>
              <li>Move to the next element and repeat until the entire array is sorted.</li>
            </ol>
            <p>This algorithm works similarly to how people sort playing cards in their hands.</p>
          </div>
        );
      
      case 'merge':
        return (
          <div className="space-y-2">
            <p>Merge Sort is an efficient, stable, divide-and-conquer algorithm. It divides the input array into two halves, recursively sorts them, and then merges the sorted halves.</p>
            <p><strong>Process:</strong></p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Divide the unsorted list into n sublists, each containing one element (a list of one element is considered sorted).</li>
              <li>Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining.</li>
            </ol>
            <p>Merge Sort is particularly efficient for large datasets and can be implemented for external sorting, where data doesn't fit in memory.</p>
          </div>
        );
      
      case 'quick':
        return (
          <div className="space-y-2">
            <p>Quick Sort is an efficient, in-place sorting algorithm that uses the divide-and-conquer strategy. It picks an element as a pivot and partitions the array around the pivot.</p>
            <p><strong>Process:</strong></p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Choose a pivot element from the array.</li>
              <li>Partition: Rearrange the array so that all elements less than the pivot come before the pivot, and all elements greater than the pivot come after it.</li>
              <li>Recursively apply the above steps to the sub-array of elements with smaller values and the sub-array of elements with greater values.</li>
            </ol>
            <p>The pivot selection and partitioning schemes can significantly impact the algorithm's performance.</p>
          </div>
        );
      
      case 'heap':
        return (
          <div className="space-y-2">
            <p>Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides the input into a sorted and an unsorted region and iteratively shrinks the unsorted region by extracting the largest element.</p>
            <p><strong>Process:</strong></p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Build a max heap from the input data.</li>
              <li>The largest item is stored at the root of the heap. Replace it with the last item of the heap and reduce the size of the heap by 1.</li>
              <li>Heapify the root of the tree.</li>
              <li>Repeat steps 2 and 3 while the size of the heap is greater than 1.</li>
            </ol>
            <p>Heap Sort has the advantage of an O(n log n) runtime regardless of the input data.</p>
          </div>
        );
      
      default:
        return <p>No detailed information available for this algorithm.</p>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{info.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2 md:col-span-2">
            {getDetailedDescription()}
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-1">Time Complexity</h4>
              <div className="text-sm">
                <p><strong>Best Case:</strong> {algorithm === 'bubble' || algorithm === 'insertion' ? 'O(n)' : info.timeComplexity}</p>
                <p><strong>Average Case:</strong> {info.timeComplexity}</p>
                <p><strong>Worst Case:</strong> {algorithm === 'quick' ? 'O(n²)' : info.timeComplexity}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-1">Space Complexity</h4>
              <p className="text-sm">{info.spaceComplexity}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-1">Stability</h4>
              <p className="text-sm">
                {algorithm === 'bubble' || algorithm === 'insertion' || algorithm === 'merge'
                  ? 'Stable'
                  : 'Not Stable'}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-1">Best Used When</h4>
              <p className="text-sm">
                {algorithm === 'bubble'
                  ? 'Array is small or nearly sorted'
                  : algorithm === 'insertion'
                  ? 'Array is small or partially sorted'
                  : algorithm === 'selection'
                  ? 'Minimizing writes is important'
                  : algorithm === 'merge'
                  ? 'Stability is important and extra memory is available'
                  : algorithm === 'quick'
                  ? 'Average case performance is important'
                  : 'External memory is limited and worst-case performance is important'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmInfo;
