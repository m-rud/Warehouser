import { useState } from "react";
import Pathfind from "../components/Pathfind";
import Scanner from "../components/Scanner";

function Home() {
  const [shelf_column, setShelf_column] = useState(null);
  const [shelf_row, setShelf_row] = useState(null);
  const [onShelf, setOnShelf] = useState(false);
  const [platformIdx, setPlatformIdx] = useState(null);

  return (
    <div>
      <Scanner
        setShelf_column={setShelf_column}
        setShelf_row={setShelf_row}
        setOnShelf={setOnShelf}
        setPlatformIdx={setPlatformIdx}
      />
      <Pathfind
        shelf_column={shelf_column}
        shelf_row={shelf_row}
        onShelf={onShelf}
        platformIdx={platformIdx}
      />
    </div>
  );
}

export default Home;
