import React, { useState } from 'react';

const ProductForm = ({ onSave }) => {
  const [startNumber, setStartNumber] = useState('');
  const [endNumber, setEndNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const start = parseInt(startNumber);
    const end = parseInt(endNumber);

    if (isNaN(start) || isNaN(end) || start >= end) {
      setError('Ingrese un número de inicio válido y un número final mayor que el inicio.');
      return;
    }

    const generatedProducts = [];

    for (let i = start; i <= end; i++) {
      const formattedCode = `VLM${String(i).padStart(6, '0')}`;
      const newProduct = {
        code: formattedCode,
      };
      generatedProducts.push(newProduct);
    }

    onSave(generatedProducts);

    setStartNumber('');
    setEndNumber('');
    setError('');
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Ingresar Rango de Códigos</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Número de Inicio:</label>
              <input
                type="number"
                className="form-control"
                value={startNumber}
                onChange={(e) => setStartNumber(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Número Final:</label>
              <input
                type="number"
                className="form-control"
                value={endNumber}
                onChange={(e) => setEndNumber(e.target.value)}
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Generar Códigos
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
