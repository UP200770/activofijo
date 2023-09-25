import React, { useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import 'bootstrap/dist/css/bootstrap.min.css';

const handlePrintClick = () => {
  const printWindow = window.open('', '', 'width=600,height=600');
  printWindow.document.open();
  printWindow.document.write('<html><head><title>Etiqueta</title></head><body>')
  printWindow.document.write(document.getElementById('VANTEC_ETIQUETA').innerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
  printWindow.close();
};

const ProductLabel = ({ productCode}) => {
  const barcodeRef = useRef(null);

  const generateLabel = (code) => {
    return `  ${code} `;
  };

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, productCode, {
        format: 'CODE128',
        displayValue: false,
        height: 40,
      });
    }
  }, [productCode]);

  
    return (
     
      <div id className="border p-4 text-center">
  <div className="form-group mb-3">
    <div id='VANTEC_ETIQUETA' className="card">
      <div className="card-body MB-3">
        {/* Utiliza flexbox para alinear los elementos horizontalmente */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src='' />
          <p style={{ marginBottom: '-11px', padding: '1px' }}>Vantec Logistics Mexico</p>
          <h2 style={{ marginBottom: '-5px' }}>{generateLabel(productCode)}</h2>
          {/* Agregar el elemento svg para el código de barras */}
          <svg  ref={barcodeRef} />
        </div>
      </div>
    </div>



      </div>
        <button
      className="btn btn-primary"
      onClick={handlePrintClick}
    >
      Imprimir Etiqueta
    </button>
      </div>
      

      
    );
    
    
};

export default ProductLabel;
