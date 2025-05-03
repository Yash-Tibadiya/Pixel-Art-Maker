"use client";

import { useState, useRef } from "react";

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
  const gridRef = useRef<HTMLDivElement>(null);

  const handleCellClick = (index: number) => {
    const newGrid = [...grid];
    // Toggle between selected color and default color
    newGrid[index] =
      newGrid[index] === selectedColor ? DEFAULT_GRID_COLOR : selectedColor;
    setGrid(newGrid);
  };

  const handleGridSizeChange = (newGridSize: number) => {
    setGridSize(newGridSize);
    setGrid(Array(newGridSize * newGridSize).fill(DEFAULT_GRID_COLOR));
  };

  const handleDownload = () => {
    console.log("handleDownload called");
    if (!gridRef.current) {
      console.log("gridRef.current is null");
      return;
    }

    const canvas = document.createElement("canvas");
    const pixelSize = 20; // Size of each pixel in the output image
    canvas.width = gridSize * pixelSize;
    canvas.height = gridSize * pixelSize;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      console.log("Canvas context obtained");
      // Draw each cell to the canvas
      grid.forEach((color, index) => {
        const x = (index % gridSize) * pixelSize;
        const y = Math.floor(index / gridSize) * pixelSize;

        ctx.fillStyle = color;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      });

      // Create download link
      const link = document.createElement("a");
      link.download = "pixel-art.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      console.log("Download link clicked");
    } else {
      console.log("Could not get canvas context");
    }
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
          className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer"
        >
          Clear
        </button>

        <button
          onClick={handleDownload}
          className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer"
        >
          Download PNG
        </button>
      </div>

      <div
        ref={gridRef}
        className="grid w-[36rem] h-[36rem] max-w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {grid.map((color, index) => (
          <div
            key={index}
            onClick={() => handleCellClick(index)}
            style={{ backgroundColor: color }}
            className="border border-gray-200"
          />
        ))}
      </div>
    </div>
  );
};

export default PixelArtMaker;
