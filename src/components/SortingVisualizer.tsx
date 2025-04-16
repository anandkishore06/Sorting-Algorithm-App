
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Moon, 
  Sun, 
  Info
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  ArrayElement, 
  SortingAlgorithm, 
  AlgorithmStep,
  generateRandomArray,
  resetVisualStates,
} from '@/utils/sortingAlgorithms';
import { getSortingSteps, getAlgorithmInfo } from '@/utils/sortingUtils';
import ArrayBars from './ArrayBars';
import AlgorithmInfo from './AlgorithmInfo';

const SortingVisualizer: React.FC = () => {
  // Theme context
  const { theme, toggleTheme } = useTheme();
  
  // Array state
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [arraySize, setArraySize] = useState<number>(50);
  
  // Algorithm state
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>('bubble');
  const [speed, setSpeed] = useState<number>(50);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  
  // Info panel state
  const [showInfo, setShowInfo] = useState<boolean>(false);
  
  // Refs for animation control
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stepsRef = useRef<AlgorithmStep[]>([]);

  // Calculate animation speed
  const getAnimationSpeed = useCallback(() => {
    // Map speed slider (1-100) to delay time (1000ms-10ms)
    // Lower value = slower animation (higher delay)
    return Math.floor(1000 - (speed * 990) / 100);
  }, [speed]);

  // Initialize array
  const initializeArray = useCallback(() => {
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    setSteps([{ array: newArray, comparing: [], swapping: [], sorted: [] }]);
    setCurrentStepIndex(0);
  }, [arraySize]);

  // Reset sorting
  const resetSorting = useCallback(() => {
    // Clear any running animation
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
    
    setIsRunning(false);
    setIsPaused(false);
    setCurrentStepIndex(0);
    
    // Reset array to initial state
    if (steps.length > 0) {
      // Reset visual states but keep the values
      const resetArray = resetVisualStates(steps[0].array);
      setArray(resetArray);
    } else {
      initializeArray();
    }
  }, [steps, initializeArray]);

  // Generate new random array
  const generateNewArray = useCallback(() => {
    // Clear any running animation
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
    
    setIsRunning(false);
    setIsPaused(false);
    initializeArray();
  }, [initializeArray]);

  // Handle algorithm change
  const handleAlgorithmChange = (value: string) => {
    setAlgorithm(value as SortingAlgorithm);
    resetSorting();
  };

  // Handle array size change
  const handleArraySizeChange = (value: number[]) => {
    setArraySize(value[0]);
  };

  // Handle speed change
  const handleSpeedChange = (value: number[]) => {
    setSpeed(value[0]);
  };

  // Start sorting
  const startSorting = useCallback(() => {
    if (isRunning && !isPaused) return;
    
    if (!isRunning) {
      // Generate steps for the chosen algorithm
      const newSteps = getSortingSteps(algorithm, [...array]);
      setSteps(newSteps);
      stepsRef.current = newSteps;
      setCurrentStepIndex(0);
      setIsRunning(true);
      setIsPaused(false);
    } else if (isPaused) {
      // Resume from pause
      setIsPaused(false);
    }
  }, [isRunning, isPaused, algorithm, array]);

  // Pause sorting
  const pauseSorting = useCallback(() => {
    if (!isRunning || isPaused) return;
    
    setIsPaused(true);
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
  }, [isRunning, isPaused]);

  // Run sorting animation
  useEffect(() => {
    if (isRunning && !isPaused && steps.length > 0) {
      if (currentStepIndex < steps.length - 1) {
        animationTimeoutRef.current = setTimeout(() => {
          setCurrentStepIndex(prevIndex => prevIndex + 1);
          setArray(steps[currentStepIndex + 1].array);
        }, getAnimationSpeed());
      } else {
        // Sorting completed
        setIsRunning(false);
      }
    }
    
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isRunning, isPaused, currentStepIndex, steps, getAnimationSpeed]);

  // Initialize array on mount and when array size changes
  useEffect(() => {
    initializeArray();
  }, [arraySize, initializeArray]);

  // When algorithm changes, reset sorting
  useEffect(() => {
    resetSorting();
  }, [algorithm, resetSorting]);

  // Get current algorithm info
  const algorithmInfo = getAlgorithmInfo(algorithm);

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-b from-background to-background/80">
      {/* Header with theme toggle */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Sorting Algorithm Visualizer
        </h1>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full shadow-sm hover:shadow-md transition-all"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 grid gap-6">
        {/* Controls Section */}
        <Card className="p-4 border border-primary/10 shadow-md bg-card/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Algorithm & Array Size Controls */}
              <div className="flex flex-col gap-4">
                {/* Algorithm Selector */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="algorithm" className="text-sm font-medium text-foreground/80">
                    Algorithm
                  </label>
                  <Select
                    value={algorithm}
                    onValueChange={handleAlgorithmChange}
                    disabled={isRunning && !isPaused}
                  >
                    <SelectTrigger id="algorithm" className="rounded-full shadow-sm hover:shadow border-primary/20">
                      <SelectValue placeholder="Select algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bubble">Bubble Sort</SelectItem>
                      <SelectItem value="selection">Selection Sort</SelectItem>
                      <SelectItem value="insertion">Insertion Sort</SelectItem>
                      <SelectItem value="merge">Merge Sort</SelectItem>
                      <SelectItem value="quick">Quick Sort</SelectItem>
                      <SelectItem value="heap">Heap Sort</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Array Size Control */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="array-size" className="text-sm font-medium text-foreground/80">
                    Array Size: {arraySize}
                  </label>
                  <Slider
                    id="array-size"
                    min={5}
                    max={100}
                    step={1}
                    value={[arraySize]}
                    onValueChange={handleArraySizeChange}
                    disabled={isRunning}
                    className="py-4"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateNewArray}
                    disabled={isRunning && !isPaused}
                    className="mt-1 rounded-full shadow-sm hover:shadow-md border-primary/20"
                  >
                    Generate New Array
                  </Button>
                </div>
              </div>

              {/* Speed & Action Controls */}
              <div className="flex flex-col gap-4">
                {/* Speed Control */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="speed" className="text-sm font-medium text-foreground/80">
                    Speed: {speed}%
                  </label>
                  <Slider
                    id="speed"
                    min={1}
                    max={100}
                    step={1}
                    value={[speed]}
                    onValueChange={handleSpeedChange}
                    className="py-4"
                  />
                </div>

                {/* Control Buttons - Reorganized into a grid */}
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-sm font-medium text-foreground/80">Controls</span>
                  <div className="grid grid-cols-1 gap-3">
                    {/* Primary controls row */}
                    <div className="flex gap-3">
                      <Button
                        onClick={startSorting}
                        variant="default"
                        className="flex-1 rounded-full shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                        disabled={isRunning && !isPaused}
                      >
                        <Play className="h-5 w-5 mr-2" />
                        {isPaused ? "Resume" : "Start"}
                      </Button>
                      
                      <Button
                        onClick={pauseSorting}
                        variant="secondary"
                        className="flex-1 rounded-full shadow-md hover:shadow-lg transition-all"
                        disabled={!isRunning || isPaused}
                      >
                        <Pause className="h-5 w-5 mr-2" />
                        Pause
                      </Button>
                    </div>
                    
                    {/* Reset button row */}
                    <Button
                      onClick={resetSorting}
                      variant="destructive"
                      className="rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Reset
                    </Button>
                    
                    {/* Info button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowInfo(!showInfo)}
                      className="rounded-full shadow-sm hover:shadow-md border-primary/20"
                    >
                      <Info className="h-4 w-4 mr-2" />
                      {showInfo ? "Hide" : "Show"} Info
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Algorithm Info Panel */}
        {showInfo && (
          <AlgorithmInfo algorithm={algorithm} />
        )}

        {/* Visualization Area */}
        <Card className="flex-1 overflow-hidden border border-primary/10 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardContent className="h-full p-4">
            <div className="h-full flex flex-col">
              <div className="mb-2 flex justify-between items-center">
                <h3 className="font-semibold text-lg text-foreground/90">{algorithmInfo.name} Visualization</h3>
                <div className="text-sm text-muted-foreground">
                  {isRunning && !isPaused && (
                    <span className="bg-primary/10 px-2 py-1 rounded-full text-primary">Step: {currentStepIndex} / {steps.length - 1}</span>
                  )}
                </div>
              </div>
              <div className="flex-1 relative min-h-[300px] p-2 bg-background/40 rounded-lg">
                <ArrayBars array={array} />
              </div>
              
              {/* Time and Space Complexity */}
              <div className="mt-4 flex justify-center gap-4">
                <Badge variant="outline" className="text-sm py-1 px-3 shadow-sm border-primary/20 bg-background/50">
                  Time: {algorithmInfo.timeComplexity}
                </Badge>
                <Badge variant="outline" className="text-sm py-1 px-3 shadow-sm border-primary/20 bg-background/50">
                  Space: {algorithmInfo.spaceComplexity}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SortingVisualizer;
