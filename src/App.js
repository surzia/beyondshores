import React, { useState } from "react";
import "./App.css";

const App = () => {
  const cols = 25; // 列数保持固定为 25
  const [rows, setRows] = useState(8); // 初始行数为 8
  const [grid, setGrid] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(""))
  );

  const [isComposing, setIsComposing] = useState(false);

  const handleInputChange = (e, row, col) => {
    const value = e.target.value;

    if (isComposing) {
      const updatedGrid = [...grid];
      updatedGrid[row][col] = value;
      setGrid(updatedGrid);
      return;
    }

    if (/^[\u4e00-\u9fa5，！？；。：、‘’“”【】（）]+$/.test(value)) {
      updateGrid(row, col, value);
      moveToNextCell(row, col);
    } else if (/^[a-zA-Z0-9]+$/.test(value)) {
      updateGrid(row, col, value);
      moveToNextCell(row, col);
    } else {
      const updatedGrid = [...grid];
      updatedGrid[row][col] = "";
      setGrid(updatedGrid);
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (e, row, col) => {
    setIsComposing(false);

    const value = e.target.value;
    if (/^[\u4e00-\u9fa5，！？；。：、‘’“”【】（）]+$/.test(value)) {
      updateGrid(row, col, value);
      moveToNextCell(row, col);
    } else if (/^[a-zA-Z0-9]+$/.test(value)) {
      updateGrid(row, col, value);
      moveToNextCell(row, col);
    } else {
      const updatedGrid = [...grid];
      updatedGrid[row][col] = "";
      setGrid(updatedGrid);
    }
  };

  const updateGrid = (row, col, value) => {
    const updatedGrid = [...grid];
    updatedGrid[row][col] = value;
    setGrid(updatedGrid);
  };

  const moveToNextCell = (row, col) => {
    const nextCol = col + 1;
    const nextRow = nextCol >= cols ? row + 1 : row;
    const actualCol = nextCol >= cols ? 0 : nextCol;

    const nextCell = document.querySelector(
      `[data-row="${nextRow}"][data-col="${actualCol}"]`
    );
    if (nextCell) {
      nextCell.focus();
    }
  };

  const handleKeyDown = (e, row, col) => {
    if (e.key === "Backspace") {
      if (grid[row][col] === "") {
        moveToPreviousCell(row, col);
      } else {
        updateGrid(row, col, "");
      }
    }
  };

  const moveToPreviousCell = (row, col) => {
    const prevCol = col - 1;
    const prevRow = prevCol < 0 ? row - 1 : row;
    const actualCol = prevCol < 0 ? cols - 1 : prevCol;

    const prevCell = document.querySelector(
      `[data-row="${prevRow}"][data-col="${actualCol}"]`
    );
    if (prevCell) {
      prevCell.focus();
    }
  };

  const handlePaste = (e, row, col) => {
    e.preventDefault();
    const pasteText = e.clipboardData.getData("text");
    const cells = pasteText.split("");

    let currentRow = row;
    let currentCol = col;

    const updatedGrid = [...grid];

    for (let i = 0; i < cells.length; i++) {
      if (currentRow >= rows) break;
      if (currentCol >= cols) {
        currentCol = 0;
        currentRow++;
      }

      updatedGrid[currentRow][currentCol] = cells[i];
      currentCol++;
    }

    setGrid(updatedGrid);

    moveToNextCell(currentRow, currentCol - 1);
  };

  const handleRowChange = (e) => {
    const newRowCount = parseInt(e.target.value, 10);
    const updatedGrid = Array.from({ length: newRowCount }, (_, rowIndex) =>
      grid[rowIndex] ? grid[rowIndex] : Array(cols).fill("")
    );
    setRows(newRowCount);
    setGrid(updatedGrid);
  };

  const clearGrid = () => {
    setGrid(Array.from({ length: rows }, () => Array(cols).fill("")));
  };

  const copyGrid = () => {
    let text = grid.flat().join("");
    if (text === "" || text === undefined || text == null) {
      return;
    }
    let answer = "";
    grid.forEach((element) => {
      element.forEach((e) => {
        if (e !== "") {
          answer += e;
        }
      });
      answer += "\n";
    });
    navigator.clipboard.writeText(answer);
  };

  return (
    <div className="app-container">
      <div className="controls">
        <label htmlFor="row-selector">选择字数：</label>
        <select id="row-selector" onChange={handleRowChange} value={rows}>
          <option value="8">200字</option>
          <option value="10">250字</option>
          <option value="12">300字</option>
          <option value="14">350字</option>
          <option value="16">400字</option>
          <option value="18">450字</option>
          <option value="20">500字</option>
          <option value="48">1200字</option>
        </select>
      </div>
      <div className="grid" id="grid-container">
        {grid.map((row, rowIndex) => (
          <div className="grid-row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                data-row={rowIndex}
                data-col={colIndex}
                className="grid-cell"
                value={cell}
                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={(e) =>
                  handleCompositionEnd(e, rowIndex, colIndex)
                }
                onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                onPaste={(e) => handlePaste(e, rowIndex, colIndex)}
                maxLength={1}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={copyGrid}>复制内容</button>
        <button onClick={clearGrid}>清空内容</button>
      </div>
    </div>
  );
};

export default App;
