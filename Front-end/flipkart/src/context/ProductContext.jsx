import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

 const fetchProducts = async (filters = {}) => {
  try {
    setLoading(true);

    const res = await api.get("/products", {
      params: filters,
    });

    setProducts(res.data.products || []);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);