
import React, { useMemo } from 'react';
import { ArrayElement } from '@/utils/sortingAlgorithms';

interface ArrayBarsProps {
  array: ArrayElement[];
}

const ArrayBars: React.FC<ArrayBarsProps> = ({ array }) => {
  // Find the maximum value for scaling
  const maxValue = useMemo(() => {
    return Math.max(...array.map((element) => element.value), 1);
  }, [array]);

  return (
    <div className="w-full h-full flex items-end justify-center gap-[2px]">
      {array.map((element, index) => {
        // Calculate bar height as percentage of container
        const heightPercentage = (element.value / maxValue) * 100;
        
        // Determine bar color based on element state
        let barColor = 'bg-gradient-to-t from-primary to-primary/80';
        
        if (element.isSorted) {
          barColor = 'bg-gradient-to-t from-green-500 to-green-400';
        } else if (element.isSwapping) {
          barColor = 'bg-gradient-to-t from-red-500 to-red-400';
        } else if (element.isComparing) {
          barColor = 'bg-gradient-to-t from-yellow-500 to-yellow-400';
        }
        
        return (
          <div
            key={index}
            className={`${barColor} rounded-t-md transition-all shadow-md`}
            style={{
              height: `${heightPercentage}%`,
              width: `${100 / Math.max(array.length, 1)}%`,
              maxWidth: '50px',
              animation: element.isSwapping ? 'array-bar-swap 0.5s ease-in-out' : 'none'
            }}
          >
            {array.length <= 20 && (
              <div className="text-xs font-semibold text-white text-center overflow-hidden">
                {element.value}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ArrayBars;
