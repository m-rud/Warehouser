import React, { useState, useEffect } from "react";
import Node from "./Node";
import Astar from "../astarAlgorithm/astar";
import "./Pathfind.css";

const cols = 50;
const rows = 20;

const NODE_START_ROW = 1;
const NODE_START_COL = 1;
const NODE_END_ROW = 2;
const NODE_END_COL = 10;

const Pathfind = () => {
  const [Grid, setGrid] = useState([]);
  const [Path, setPath] = useState([]);

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    const grid = new Array(rows);

    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
    }

    createSpot(grid);

    setGrid(grid);

    addNeighbours(grid);

    let startNode = null
    let endNode = null

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j].isEnd) endNode = grid[i][j];
        if (grid[i][j].isStart) startNode = grid[i][j];
      }
    }

    console.log(grid);


    let path = Astar(startNode, endNode);
    setPath(path);
  };

  const createSpot = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = new Spot(i, j);
        if (i == 0 || i == rows - 1 || j == 0 || j == cols - 1) grid[i][j].isWall = true;
      }
    }

    grid[9][10] = new Spot(9, 10, true);
    grid[8][10] = new Spot(8, 10, true);
    grid[7][10] = new Spot(7, 10, true);
    grid[6][10] = new Spot(6, 10, true);
    grid[4][10] = new Spot(4, 10, true);
    grid[3][10] = new Spot(3, 10, true);
    grid[2][10] = new Spot(2, 10, false, true, 3);
    grid[1][10] = new Spot(1, 10, false, true, 3);
    grid[0][10] = new Spot(0, 10, true);
  };

  const addNeighbours = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j].addneighbours(grid);
        if (grid[i][j].isEnd) {
          grid[i][j].alignEnd(grid);
        }
      }
    }
  };

  function Spot(i, j, isWall = false, isShelf = false, front = null) {
    this.x = i;
    this.y = j;
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.isWall = isWall;
    this.isShelf = isShelf;
    this.front = front;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.neighbours = [];
    this.previous = undefined;

    this.addneighbours = function (grid) {
      let i = this.x;
      let j = this.y;
      if (i > 0 && !grid[i - 1][j].isWall && !grid[i - 1][j].isShelf) this.neighbours.push(grid[i - 1][j]);
      if (j < cols - 1 && !grid[i][j + 1].isWall && !grid[i][j + 1].isShelf) this.neighbours.push(grid[i][j + 1]);
      if (i < rows - 1 && !grid[i + 1][j].isWall && !grid[i + 1][j].isShelf) this.neighbours.push(grid[i + 1][j]);
      if (j > 0 && !grid[i][j - 1].isWall && !grid[i][j - 1].isShelf) this.neighbours.push(grid[i][j - 1]);
    };
    this.alignEnd = function (grid) {
      if (this.front) {
        this.isEnd = false;
        switch (this.front) {
          case 0:
            grid[i - 1][j].isEnd = true;
            break;
          case 1:
            grid[i][j + 1].isEnd = true;
            break;
          case 2:
            grid[i + 1][j].isEnd = true;
            break;
          case 3:
            grid[i][j - 1].isEnd = true;
            break;
          default:
            break;
        }
      }
    }
  }

  const gridWithNode = (
    <div>
      {Grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const { isStart, isEnd } = col;
              return (
                <Node
                  key={colIndex}
                  isStart={isStart}
                  isEnd={rowIndex === NODE_END_ROW && colIndex === NODE_END_COL}
                  row={rowIndex}
                  col={colIndex}
                  wall={col.isWall}
                  shelf={col.isShelf}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  const visualizeShortestPath = (shortestPathNodes) => {
    for (let i = 0; i < Path.length; i++) {
      setTimeout(() => {
        const node = Path[i];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-shortest-path";
      }, 10 * i);
    }
  };

  const visualizePath = () => {
    console.log("Visualazing");
  };

  console.log(Path);
  return (
    <div className="wrapper">
      <button onClick={visualizeShortestPath}>Pokaz sciezke</button>
      <div className="gridContainer">
        {gridWithNode}
      </div>
    </div>
  );
};

export default Pathfind;
