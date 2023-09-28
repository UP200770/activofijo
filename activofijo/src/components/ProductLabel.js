import React, { useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import { saveAs } from "file-saver"; // Importa saveAs desde file-saver
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const ProductLabel = ({ productCode }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, productCode, {
        format: "CODE128",
        displayValue: false,
        height: 40,
      });
    }
  }, [productCode]);

  const downloadBarcode = () => {
    if (barcodeRef.current) {
      const svg = barcodeRef.current;
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          saveAs(blob, `${productCode}_barcode.png`);
        });
      };

      img.src = "data:image/svg+xml," + encodeURIComponent(svgData);
    }
  };

  return (
    <div className="border p-4 text-center">
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-column align-items-center">
            <img
              src={require("./VANTEC.png")}
              alt="Logo"
              height={30}
              className="mb-3"
            />
            <p className="mb-1 text-muted small">
              Vantec Logistics Mexico, SA de CV
            </p>
            <h2 className="mb-3">{productCode}</h2>
            <svg ref={barcodeRef} />
            <button onClick={downloadBarcode} className="btn btn-primary">
              <i className="fa fa-download"></i> 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLabel;
