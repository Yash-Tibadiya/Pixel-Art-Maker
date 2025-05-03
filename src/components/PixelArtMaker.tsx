"use client";

import { useState } from "react";

const DEFAULT_GRID_SIZE = 16;
const DEFAULT_GRID_COLOR = "#fff";
const DEFAULT_SELECTED_COLOR = "#000";

const PixelArtMaker = () => {
  const [gridSize, setGridSize] = useState<number>(DEFAULT_GRID_SIZE);
  const [grid, setGrid] = useState<string[]>(
    Array(gridSize * gridSize).fill(DEFAULT_GRID_COLOR)
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    DEFAULT_SELECTED_COLOR
  );

  const handleCellClick = (index: number) => {
    const newGrid = [...grid];
    newGrid[index] = selectedColor;
    setGrid(newGrid);
  };

  const handleGridSizeChange = (newGridSize: number) => {
    setGridSize(newGridSize);
    setGrid(Array(newGridSize * newGridSize).fill(DEFAULT_GRID_COLOR));
  };

  return (
    <div className="flex flex-col items-center gap-4 pt-4">
      <h1 className="text-2xl font-bold">Pixel Art Maker</h1>

      <div className="flex flex-row gap-4 items-center">
        <div className="flex items-center gap-2">
          <label htmlFor="grid-size" className="font-medium">
            Grid Size:
          </label>
          <input
            id="grid-size"
            type="number"
            min="1"
            max="32"
            value={gridSize}
            onChange={(e) => handleGridSizeChange(Number(e.target.value))}
            className="w-16 p-1 border rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="pick-color" className="font-medium">
            Color:
          </label>
          <input
            id="pick-color"
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-8 h-8 cursor-pointer"
          />
        </div>

        <button
          onClick={() =>
            setGrid(Array(gridSize * gridSize).fill(DEFAULT_GRID_COLOR))
          }
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Clear
        </button>
      </div>

      <div
        className="grid w-[36rem] h-[36rem] max-w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {grid.map((color, index) => (
          <div
            key={index}
            onClick={() => handleCellClick(index)}
            style={{ backgroundColor: color }}
            className="border border-gray-200 dark:border-gray-700 hover:opacity-90 transition-opacity"
          />
        ))}
      </div>
    </div>
  );
};

export default PixelArtMaker;
