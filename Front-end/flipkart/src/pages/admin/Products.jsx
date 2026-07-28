import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";
import { Link } from "react-router-dom";
import { FiPlus, FiBox, FiEdit3, FiTrash2, FiAlertCircle } from "react-icons/fi";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Error retrieving catalog indexes:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id, name) => {
    // Elegant system safety safeguard block
    const confirmDelete = window.confirm(`Are you sure you want to permanently delete "${name}"?`);
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Failed to eliminate product record:", error);
      alert("Error deleting product. Please try again.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-[1500px] mx-auto select-none">
        
        {/* HEADER BRAND AREA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hidden sm:block">
              <FiBox size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                Products Inventory
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Total Products: <span className="font-bold text-gray-800">{products.length}</span> items across your catalog.
              </p>
            </div>
          </div>

          <Link
            to="/admin/products/add"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-[0.98] self-start sm:self-center"
          >
            <FiPlus size={18} strokeWidth={2.5} />
            <span>Add Product</span>
          </Link>
        </div>

        {/* LOADING SHIMMER STATE */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-2xl border border-gray-100 p-4 space-y-4 shadow-xs animate-pulse">
                <div className="h-48 bg-gray-100 rounded-xl w-full" />
                <div className="h-4 bg-gray-200 rounded-md w-3/4" />
                <div className="h-3 bg-gray-100 rounded-md w-1/2" />
                <div className="h-10 bg-gray-50 rounded-xl w-full pt-2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          
          /* EMPTY CATALOG COMPASS */
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-xs max-w-md mx-auto mt-12 p-8">
            <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4 text-gray-400">
              <FiBox size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No products found</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
              Your inventory database registry is currently empty. Start by listing a new retail commodity!
            </p>
          </div>
        ) : (
          
          /* GRID INVENTORY SECTION */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const isLowStock = product.stock <= 5;
              const fallbackImage = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80";

              return (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200/80 p-4 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden relative"
                >
                  {/* IMAGE PREVIEW FRAME */}
                  <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-50 border border-gray-50">
                    <img
                      src={product.images?.[0]?.url || fallbackImage}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* LOW STOCK FLOATING NOTIFIER */}
                    {isLowStock && (
                      <div className="absolute top-2.5 left-2.5 bg-rose-50 text-rose-700 border border-rose-100 px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-sm backdrop-blur-xs">
                        <FiAlertCircle size={12} />
                        <span>Low Stock</span>
                      </div>
                    )}
                  </div>

                  {/* META LABELS INFORMATION BLOCK */}
                  <div className="mt-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="font-bold text-gray-800 text-base line-clamp-1 group-hover:text-blue-600 transition-colors" title={product.name}>
                        {product.name}
                      </h2>
                      
                      <div className="flex items-baseline gap-1 mt-1.5">
                        <span className="text-xl font-black text-gray-900">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* METRIC LEVEL TRACKERS */}
                    <div className="mt-3 pt-2.5 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-semibold">
                      <span>Inventory Stock</span>
                      <span className={`font-extrabold text-sm ${isLowStock ? "text-rose-600" : "text-gray-700"}`}>
                        {product.stock === 0 ? "Out of Stock" : `${product.stock} units`}
                      </span>
                    </div>

                    {/* INTERACTIVE MANAGEMENT ROW ACTIONS */}
                    <div className="flex gap-2.5 mt-4 pt-1">
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 border border-gray-200/60 hover:border-blue-200 rounded-xl py-2 text-xs font-bold transition-all active:scale-[0.97]"
                      >
                        <FiEdit3 size={14} />
                        <span>Edit</span>
                      </Link>

                      <button
                        onClick={() => deleteProduct(product._id, product.name)}
                        className="inline-flex items-center justify-center w-10 h-9 bg-gray-50 hover:bg-rose-50 text-gray-400 hover:text-rose-600 border border-gray-200/60 hover:border-rose-200 rounded-xl transition-all active:scale-[0.97]"
                        aria-label="Delete asset"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default Products;