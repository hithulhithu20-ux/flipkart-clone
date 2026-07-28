// import { useParams } from "react-router-dom";

// import MainLayout from "../layouts/MainLayout";

// import ProductGallery from "../components/productDetails/ProductGallery";
// import ProductInfo from "../components/productDetails/ProductInfo";
// import ReviewsSection from "../components/productDetails/ReviewsSection";

// import { useProducts } from "../context/ProductContext";
// const ProductDetails = () => {
//   const { products } = useProducts();
//   const { id } = useParams();

//   const product = products.find(
//     (item) => item._id === id
//   );

//   if (!product) {
//     return (
//       <MainLayout>
//         <div className="flex h-[70vh] items-center justify-center">
//           Loading Product...
//         </div>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <div className="mx-auto max-w-[1400px] p-4">
//         <div className="bg-white">
//           <div className="grid grid-cols-1 lg:grid-cols-2">
//             <ProductGallery product={product} />
//             <ProductInfo product={product} />
//           </div>
//         </div>

//         <ReviewsSection />
//       </div>
//     </MainLayout>
//   );
// };

// export default ProductDetails;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

import MainLayout from "../layouts/MainLayout";

import ProductGallery from "../components/productDetails/ProductGallery";
import ProductInfo from "../components/productDetails/ProductInfo";
import ReviewsSection from "../components/productDetails/ReviewsSection";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/products/${id}`);

        setProduct(res.data.product);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex h-[70vh] items-center justify-center">
          Loading Product...
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="flex h-[70vh] items-center justify-center">
          Product not found
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-[1400px] p-4">
        <div className="bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <ProductGallery product={product} />
            <ProductInfo product={product} />
          </div>
        </div>

        <ReviewsSection product={product} />
      </div>
    </MainLayout>
  );
};

export default ProductDetails;