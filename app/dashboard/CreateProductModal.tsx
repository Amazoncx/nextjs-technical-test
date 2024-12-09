import { useState } from "react";
import { createProduct } from "@/libs/actions/products";

const CreateProductModal = ({ onClose, onProductCreated }: any) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!nombre || !descripcion || !precio) {
      setError("Por favor, complete todos los campos.");
      setLoading(false);
      return;
    }

    const precioNumerico = parseFloat(precio);
    if (isNaN(precioNumerico) || precioNumerico <= 0) {
      setError("El precio debe ser un número mayor a 0.");
      setLoading(false);
      return;
    }

    try {
      await createProduct(nombre, descripcion, precioNumerico);
      onProductCreated();
      onClose();
    } catch (err: any) {
      console.error("Error al crear producto:", err.message);
      setError("Error al crear el producto. Inténtelo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Crear Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Nombre</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Descripción</label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Precio</label>
            <input
              type="number"
              step="0.01"
              className="input input-bordered w-full"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
