import MainLayout from "../layouts/MainLayout";
import HeroSlider from "../components/home/HeroSlider";
import ProductGrid from "../components/home/ProductGrid";
import { useProducts } from "../context/ProductContext";

const Home = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <MainLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <h2 className="text-xl font-semibold">
            Loading products...
          </h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-[1600px]">
        <HeroSlider />

        <ProductGrid products={products} />
      </div>
    </MainLayout>
  );
};

export default Home;