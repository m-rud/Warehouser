import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";

function Scanner() {

    const [scanResult, setScanResult] = useState(null);

    let qrCode;
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        setScanResult(decodedText);
        console.log(`Scan result: ${decodedText}`, decodedResult);
        qrCode.stop().then(() => {
            qrCode.clear();
        })
    };
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    useEffect(() => {
        // File based scanning
        const fileinput = document.getElementById('qr-input-file');
        fileinput.addEventListener('change', e => {
        if (e.target.files.length == 0) {
            return;
        }
        const imageFile = e.target.files[0];
        qrCode.scanFile(imageFile, /* showImage= */false)
        .then(qrCodeMessage => {
            console.log(qrCodeMessage);
        })
        .catch(err => {
            console.log(`Error scanning file. Reason: ${err}`)
        });
        });
    }, []);

    const run = () => {
        setScanResult(null);
        qrCode = new Html5Qrcode("reader");
        qrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback, (error) => console.log(error));
    }

    return (
        <div>
            <button onClick={run} style={{ position: 'fixed', bottom: '10px', right: '10px'}}>QR</button>
            {scanResult
            ? <div>QR result: {scanResult}</div>
            : <div id="reader"></div>
            }
            <input type="file" id="qr-input-file" accept="image/*"></input>
        </div>
    );
}

export default Scanner;