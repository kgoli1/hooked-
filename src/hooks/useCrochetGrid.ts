import { useState } from 'react';

interface Cell {
  color: string;
  stitch: string;
}

export function useCrochetGrid(initialSize: number) {
  const [gridSize, setGridSize] = useState(initialSize);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentStitch, setCurrentStitch] = useState('sc');
  const [grid, setGrid] = useState<Cell[][]>(() =>
    Array(initialSize)
      .fill(null)
      .map(() =>
        Array(initialSize).fill({ color: '#ffffff', stitch: '' })
      )
  );

  const updateCell = (row: number, col: number) => {
    const newGrid = [...grid];
    newGrid[row][col] = { color: currentColor, stitch: currentStitch };
    setGrid(newGrid);
  };

  const resetGrid = (size: number) => {
    setGridSize(size);
    setGrid(
      Array(size)
        .fill(null)
        .map(() =>
          Array(size).fill({ color: '#ffffff', stitch: '' })
        )
    );
  };

  return {
    grid,
    gridSize,
    currentColor,
    setCurrentColor,
    currentStitch,
    setCurrentStitch,
    updateCell,
    resetGrid,
  };
}