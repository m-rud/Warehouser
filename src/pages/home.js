import { useState } from "react";
import Pathfind from "../components/Pathfind";
import Scanner from "../components/Scanner";

function Home() {
    const [shelf_column, setShelf_column] = useState(null);
    const [shelf_row, setShelf_row] = useState(null);

  return (
    <div>
      <Scanner setShelf_column={setShelf_column} setShelf_row={setShelf_row}/>
      <Pathfind shelf_column={shelf_column} shelf_row={shelf_row}/>
    </div>
  );
}

export default Home;
