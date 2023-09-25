import React, { useState } from 'react';
import './App.css';
import ProductLabel from './components/ProductLabel';
import ProductForm from './components/ProductForm';


function App() {
  const [products, setProducts] = useState([]);

  const handleSaveProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="App">
      <ProductForm onSave={handleSaveProduct} />
    
      <h2>Activos Fijos</h2>
      {products.map((product) => (
        <ProductLabel
          productCode={product.code}
        />
      ))}
    </div>
  );
}

export default App;