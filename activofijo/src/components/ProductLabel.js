import React, { useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import 'bootstrap/dist/css/bootstrap.min.css';
 
/* const handlePrintClick = () => {
  const printWindow = window.open('', '', 'width=600,height=600');
  printWindow.document.open();
  printWindow.document.write(document.getElementById('VANTEC_ETIQUETA').innerHTML);
  printWindow.document.close();
  printWindow.print();
  printWindow.close();
}; */
 
const ProductLabel = ({ productCode}) => {
  const barcodeRef = useRef(null);
  const generateLabel = (code) => {
    
    return `${code} `;
  };
 
  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, productCode, {
        format: 'CODE128',
        displayValue: false,
        height: 30,
      });
    }
  }, [productCode]);
 
  
    return (
     
 
<div id className="border p-4 text-center">    
  <div className="form-group mb-3">
    
    <div id='VANTEC_ETIQUETA' className="card">
      
      <div style={{ marginBottom:'-85px', marginTop:'-85px'}} className="card-body ">
         
        <div style={{ marginBottom:'1332323', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <p style={{ marginBottom: '-35px', padding: '1px',fontSize:'12px', fontWeight:'500' }}>  <img style={{ marginBottom: '6px'}} src={require('./VANTEC.png')} alt='2' height={20} ></img>Vantec Logistics Mexico, SA de CV </p>
          <h2 style={{ marginBottom: '-25px', fontSize: '27px', letterSpacing:'1.4px', fontWeight:'700' }}>{generateLabel( productCode)}</h2>
          
          <svg  ref={barcodeRef} />
        </div>
      </div>
    </div>

 
    </div>
        {/* <button
          className="btn btn-primary"
          onClick={handlePrintClick}>
          Imprimir Etiqueta
        </button> */}
    </div>
      
 
      
    );
    
    
};
 
export default ProductLabel;