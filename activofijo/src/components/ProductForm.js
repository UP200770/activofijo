import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductForm = ({ onSave }) => {
  const [productCode, setProductCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productCode.trim()) {
      setError('Campo vacío, por favor ingrese un valor.');
      return; // Evita que se continúe con el proceso si el campo está vacío
    }

    const newProduct = {
      code: productCode,
    };

    onSave(newProduct);

    // Limpiar los campos después de guardar
    setProductCode('');
    setError(''); // Limpia el mensaje de error
  };

  return (
    <div className="product-form">
      <h2>Ingresar Codigo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Activo Fijo:</label>
          <input
            type="text"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
