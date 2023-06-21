import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CloseIcon from "@mui/icons-material/Close";

const Scanner = ({
  setShelf_column,
  setShelf_row,
  setOnShelf,
  setPlatformIdx,
}) => {
  const [scanning, setScanning] = useState(false);
  const [qrCode, setQrCode] = useState();

  const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    qrCode.stop().then(() => {
      qrCode.clear();
    });
    setScanning(false);
    getItem(decodedText);
  };
  const config = { fps: 10, qrbox: { width: 300, height: 300 } };

  useEffect(() => {
    setQrCode(new Html5Qrcode("reader"));
  }, []);

  const run = () => {
    if (!scanning) {
      setScanning(true);
      qrCode.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback,
        (error) => console.log(error)
      );
    } else {
      qrCode.stop();
      setScanning(false);
    }
  };

  const getItem = async (itemID) => {
    const docRef = doc(db, "items", itemID);
    const docSnap = await getDoc(docRef);

    let itemDict = docSnap.data();
    setShelf_row(itemDict.shelf_row);
    setShelf_column(itemDict.shelf_column);
    setOnShelf(itemDict.onShelf);
    setPlatformIdx(itemDict.platform);
  };

  return (
    <div>
      <Box m={2} position="absolute" bottom="0px" right="0px">
        <Fab
          color={scanning ? "error" : "primary"}
          aria-label="add"
          onClick={run}
        >
          {scanning ? <CloseIcon /> : <QrCodeScannerIcon />}
        </Fab>
      </Box>
    </div>
  );
};

export default Scanner;
