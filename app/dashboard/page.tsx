"use client";

import { useState, useEffect } from "react";
import { fetchProducts, createProduct } from "@/libs/actions/products";
import CreateProductModal from "./CreateProductModal";
import { Search, Plus, ChevronLeft, ChevronRight, Package2 } from "lucide-react";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  const fetchAndSetProducts = async () => {
    try {
      const data = await fetchProducts(search, page);
      setProducts(data);
    } catch (err) {
      console.error("Error al cargar productos:", err.message);
    }
  };

  const handleProductCreated = () => {
    setIsModalOpen(false);
    fetchAndSetProducts();
  };

  useEffect(() => {
    fetchAndSetProducts();
  }, [search, page]);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Package2 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-base-content">Dashboard de Productos</h1>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            Crear Producto
          </button>
        </div>

        {/* Search Bar */}
        <div className="form-control mb-8">
          <div className="input-group" style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
            <input
              type="text"
              className="input input-bordered input-md focus:outline-none"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-square btn-primary btn-md ml-2">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <div key={product.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <h3 className="card-title text-xl">{product.name}</h3>
                <p className="text-base-content/70">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="badge badge-primary badge-lg font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                  <button className="btn btn-ghost btn-sm">Ver detalles</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="join shadow-lg">
            <button
              className="join-item btn"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeft className="w-5 h-5" />
              Anterior
            </button>
            <button className="join-item btn btn-primary">
              Página {page}
            </button>
            <button
              className="join-item btn"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Siguiente
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-error mt-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <CreateProductModal
            onClose={() => setIsModalOpen(false)}
            onProductCreated={handleProductCreated}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;