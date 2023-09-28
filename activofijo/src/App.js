import React, { useState } from 'react';
import './App.css';
import ProductLabel from './components/ProductLabel';
import ProductForm from './components/ProductForm';

function App() {
  const [products, setProducts] = useState([]);

  const handleSaveProduct = (generatedProducts) => {
    setProducts([...products, ...generatedProducts]);
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
              <div className="list-group">
                {products.map((product, index) => (
                  <ProductLabel
                    key={index}
                    productCode={product.code}
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
