import ProductCard from "../product/ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <section className="px-4 py-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Products
        </h2>

        <p className="text-gray-500">
          {products.length} Products
        </p>
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-xl font-semibold">
            No products found
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGrid;