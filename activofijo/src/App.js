import React, { useState } from 'react';
import './App.css';
import ProductLabel from './components/ProductLabel';
import ProductForm from './components/ProductForm';
import { saveAs } from 'file-saver';
import { Document, Page, View, Text, pdf } from '@react-pdf/renderer'; 
import Barcode from 'react-barcode';
function App() {
  const [products, setProducts] = useState([]);

  const handleSaveProduct = (generatedProducts) => {
    setProducts([...products, ...generatedProducts]);
  };

  const handleClearProduct = (indexToRemove) => {
    const updatedProducts = products.filter((_, index) => index !== indexToRemove);
    setProducts(updatedProducts);
  };

  const handleClearProducts = () => {
    setProducts([]);
  };

  const downloadAllBarcodesPDF = () => {
    const blobStream = pdf((
      <Document>
        {products.map((product, index) => (
          <Page key={index} size="A4">
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Barcode value={product.code} height={40} />
              <Text>{product.code}</Text>
            </View>
          </Page>
        ))}
      </Document>
    )).toBlob();

    blobStream.then((blob) => {
      saveAs(blob, 'All_Barcodes.pdf');
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h2 className="card-title">Generador de Activos Fijos</h2>
              <ProductForm onSave={handleSaveProduct} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h2 className="card-title">Activos Fijos Generados</h2>
              <button onClick={handleClearProducts} className="btn btn-danger mb-3">
                <i className="fa fa-trash"></i>
                Clear All
              </button>
              <button onClick={downloadAllBarcodesPDF} className="btn btn-success mb-3">
                <i className="fa fa-file-pdf-o"></i>
                Download All Barcodes PDF
              </button>
              <div className="list-group">
                {products.map((product, index) => (
                  <ProductLabel
                    key={index}
                    productCode={product.code}
                    onClear={() => handleClearProduct(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
