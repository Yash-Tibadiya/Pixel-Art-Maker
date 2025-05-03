"use client";

import { useState } from "react";

const PixelArtMaker = () => {
  const [gridSize, setGridSize] = useState<number>(16); // 16x16 grid by default
  const [grid, setGrid] = useState<string[]>(
    Array(gridSize * gridSize).fill("#fff")
  ); // Initialize the grid with "white color" values

  return <div className="grid w-[30rem] h-[30rem]" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
    {grid.map((color, index) => (
      <div
        key={index}
        style={{ backgroundColor: color }}
        className="border"
      />
    ))}
  </div>;
};

export default PixelArtMaker;
