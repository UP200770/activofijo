import React, { useState } from 'react';

const ProductForm = ({ onSave }) => {
  const [startNumber, setStartNumber] = useState('');
  const [endNumber, setEndNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para el cargador

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = parseInt(startNumber);
    const end = parseInt(endNumber);

    if (isNaN(start) || isNaN(end) || start >= end) {
      setError('Ingrese un número de inicio válido y un número final mayor que el inicio.');
      return;
    }

    setLoading(true); // Mostrar el cargador

    const generatedProducts = [];

    for (let i = start; i <= end; i++) {
      const formattedCode = `VLM${String(i).padStart(6, '0')}`;
      const newProduct = {
        code: formattedCode,
      };
      generatedProducts.push(newProduct);
    }

    // Simulación de retardo para mostrar el cargador
    await new Promise((resolve) => setTimeout(resolve, 2000));

    onSave(generatedProducts);

    setStartNumber('');
    setEndNumber('');
    setError('');
    setLoading(false); // Ocultar el cargador después de la generación
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
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p>Generando códigos...</p>
              </div>
            ) : (
              <>
                {error && <p className="text-danger">{error}</p>}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Generar Códigos
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
