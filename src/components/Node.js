import React from "react";
import "./Node.css";

const Node = ({ isStart, isEnd, row, col, wall, shelf }) => {
    const classes = isStart ? "node-start" : isEnd ? "node-end" : wall ? "node-wall" : shelf ? "node-shelf" : "";
    return <div className={`node ${classes}`} id={`node-${row}-${col}`}></div>;
};

export default Node;