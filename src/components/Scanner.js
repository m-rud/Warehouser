import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CloseIcon from '@mui/icons-material/Close';

const Scanner = () => {

    const [scanResult, setScanResult] = useState(null);
    const [scanning, setScanning] = useState(false);

    let qrCode;
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        setScanResult(decodedText);
        console.log(`Scan result: ${decodedText}`, decodedResult);
        qrCode.stop().then(() => {
            qrCode.clear();
        })
    };
    const config = { fps: 10, qrbox: { width: 200, height: 200 } };

    useEffect(() => {

    }, []);

    const run = () => {
        if (!scanning) {
            setScanResult(null);
            qrCode = new Html5Qrcode("reader");
            qrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback, (error) => console.log(error));
            setScanning(true);
        }
        else {
            qrCode.stop().then(() => {
                qrCode.clear();
            })
            setScanning(false);
        }
        
    }
//<button onClick={run} style={{ position: 'fixed', bottom: '10px', right: '10px'}}>QR</button>
    return (
        <div>
            <Box
            m={2}
            position="fixed"
            bottom="0px"
            right="0px"
            >
            <Fab color={scanning ? "warning" : "primary"} aria-label="add" onClick={run} >
                {scanning ? <CloseIcon/> : <QrCodeScannerIcon />}
            </Fab>
            </Box>
            {scanResult
            ? <div>QR result: {scanResult}</div>
            : <div id="reader"></div>
            }
        </div>
    );
}

export default Scanner;