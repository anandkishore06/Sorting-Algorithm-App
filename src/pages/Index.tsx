
import SortingVisualizer from '@/components/SortingVisualizer';
import { ThemeProvider } from '@/contexts/ThemeContext';

const Index = () => {
  return (
    <ThemeProvider>
      <SortingVisualizer />
    </ThemeProvider>
  );
};

export default Index;
