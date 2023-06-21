import React, { useState, useEffect } from "react";
import Node from "./Node";
import Astar from "../astarAlgorithm/astar";
import "./Pathfind.css";
import Constants from "./Constants";

const cols = 50;
const rows = 30;
const walls = Constants.walls;
const shelfs = Constants.shelfs;
const platforms = Constants.platforms;

let NODE_START_ROW = null;
let NODE_START_COL = null;
let NODE_END_ROW = null;
let NODE_END_COL = null;
let ON_SHELF = false;
let platform = [5, 1];
let sciany = [];

const Pathfind = ({ shelf_column, shelf_row, onShelf, platformIdx }) => {
  const [Grid, setGrid] = useState([]);

  useEffect(() => {
    if (onShelf !== null) ON_SHELF = onShelf;
    if (platformIdx !== null) platform = platforms[platformIdx];
    if (ON_SHELF) {
      if (shelf_row !== null && shelf_column !== null) {
        NODE_START_COL = shelf_row;
        NODE_START_ROW = shelf_column;
        NODE_END_ROW = platform[0];
        NODE_END_COL = platform[1];
      }
    } else {
      if (shelf_row !== null && shelf_column !== null) {
        NODE_END_COL = shelf_row;
        NODE_END_ROW = shelf_column;
        NODE_START_COL = platform[1];
        NODE_START_ROW = platform[0];
      }
    }
    initializeGrid();
    // eslint-disable-next-line
  }, [shelf_column, shelf_row]);

  const initializeGrid = () => {
    const grid = new Array(rows);

    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
    }

    createSpot(grid);

    setGrid(grid);

    addNeighbours(grid);

    let startNode = null;
    let endNode = null;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j].isEnd) endNode = grid[i][j];
        if (grid[i][j].isStart) startNode = grid[i][j];
      }
    }

    let path;
    if (NODE_END_ROW !== null && NODE_END_COL !== null) {
      clearGrid();
      path = Astar(startNode, endNode);
      visualizeShortestPath(path);
    }
  };

  const createSpot = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = new Spot(i, j);
        if (i === 0 || i === rows - 1 || j === 0 || j === cols - 1)
          grid[i][j].isWall = true; //wall border
        if (
          walls.find((el) => JSON.stringify(el) === JSON.stringify([i, j])) &&
          !grid[i][j].isEnd
        )
          grid[i][j].isWall = true; //build walls from array
        if (
          shelfs.find((el) => JSON.stringify(el) === JSON.stringify([i, j])) &&
          !grid[i][j].isEnd
        )
          grid[i][j].isShelf = true; //build shelfs from array
        if (
          platforms.find(
            (el) => JSON.stringify(el) === JSON.stringify([i, j])
          ) &&
          !grid[i][j].isEnd
        )
          grid[i][j].isPlatform = true; //build platforms from array
      }
    }
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

  function Spot(
    i,
    j,
    isWall = false,
    isShelf = false,
    isPlatform = false,
    front = null
  ) {
    this.x = i;
    this.y = j;
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.isWall = isWall;
    this.isShelf = isShelf;
    this.isPlatform = isPlatform;
    this.front = front;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.neighbours = [];
    this.previous = undefined;

    this.addneighbours = function (grid) {
      let i = this.x;
      let j = this.y;
      if (
        i > 0 &&
        !grid[i - 1][j].isWall &&
        !grid[i - 1][j].isShelf &&
        !grid[i - 1][j].isPlatform
      )
        this.neighbours.push(grid[i - 1][j]);
      if (
        j < cols - 1 &&
        !grid[i][j + 1].isWall &&
        !grid[i][j + 1].isShelf &&
        !grid[i][j + 1].isPlatform
      )
        this.neighbours.push(grid[i][j + 1]);
      if (
        i < rows - 1 &&
        !grid[i + 1][j].isWall &&
        !grid[i + 1][j].isShelf &&
        !grid[i + 1][j].isPlatform
      )
        this.neighbours.push(grid[i + 1][j]);
      if (
        j > 0 &&
        !grid[i][j - 1].isWall &&
        !grid[i][j - 1].isShelf &&
        !grid[i][j - 1].isPlatform
      )
        this.neighbours.push(grid[i][j - 1]);
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
    };
  }

  const dobuduj = (event) => {
    let id = event.target.id;
    event.target.style.backgroundColor = "yellow";
    let x = Number(
      id
        .substring(id.indexOf("-") + 1)
        .substring(0, id.substring(id.indexOf("-") + 1).indexOf("-"))
    );
    let y = Number(id.substring(id.lastIndexOf("-") + 1));
    sciany.push([x, y]);
  };

  const gridWithNode = (
    <div>
      {Grid.map((row, rowIndex) => {
        return (
          <div
            key={rowIndex}
            className="rowWrapper"
            onClick={(e) => dobuduj(e)}
          >
            {row.map((col, colIndex) => {
              const { isStart, isEnd } = col;
              return (
                <Node
                  key={colIndex}
                  isStart={isStart}
                  isEnd={isEnd}
                  row={rowIndex}
                  col={colIndex}
                  wall={col.isWall}
                  shelf={col.isShelf}
                  platform={col.isPlatform}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  const visualizeShortestPath = (shortestPathNodes) => {
    for (let i = 1; i < shortestPathNodes.length - 1; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        if (document.getElementById(`node-${node.x}-${node.y}`))
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-shortest-path";
      }, 50 * i);
    }
  };

  const clearGrid = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (
          document.getElementById(`node-${i}-${j}`) &&
          document.getElementById(`node-${i}-${j}`).className ===
            "node node-shortest-path"
        )
          document.getElementById(`node-${i}-${j}`).className = "node";
      }
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="gridContainer">{gridWithNode}</div>
      </div>
    </>
  );
};

export default Pathfind;
