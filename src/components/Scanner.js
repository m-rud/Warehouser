import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CloseIcon from "@mui/icons-material/Close";

const Scanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [qrCode, setQrCode] = useState();

  const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    setScanResult(decodedText);
    console.log(`Scan result: ${decodedText}`, decodedResult);
    qrCode.stop().then(() => {
      qrCode.clear();
    });
  };
  const config = { fps: 10, qrbox: { width: 250, height: 250 } };

  useEffect(() => {
    setQrCode(new Html5Qrcode("reader"));
  }, []);

  const run = () => {
    console.log(scanning);
    if (!scanning) {
      setScanResult(null);
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
  return (
    <div>
      <Box m={2} position="absolute" bottom="0px" right="0px">
        <Fab
          color={scanning ? "warning" : "primary"}
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
