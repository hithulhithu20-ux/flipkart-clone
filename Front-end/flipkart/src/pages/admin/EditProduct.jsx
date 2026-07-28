import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import AddProduct from "./AddProduct";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setInitialData(res.data.product);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!initialData) return <p>Loading...</p>;

  return (
    <AddProduct
      mode="edit"
      productId={id}
      initialData={initialData}
      onSuccess={() => navigate("/admin/products")}
    />
  );
};

export default EditProduct;