import ProductCard from "../product/ProductCard";

const ProductSection = ({
  title,
  products,
}) => {
  return (
    <section className="mt-4 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {title}
        </h2>

        <button className="bg-[#2874f0] px-4 py-2 text-white">
          VIEW ALL
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;