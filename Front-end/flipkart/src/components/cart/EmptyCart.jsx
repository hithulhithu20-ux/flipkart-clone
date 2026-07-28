import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="rounded bg-white p-10 text-center">

      <h2 className="text-3xl font-semibold">
        Your cart is empty
      </h2>

      <p className="mt-3 text-gray-500">
        Add some products to continue shopping.
      </p>

      <Link
        to="/"
        className="mt-5 inline-block bg-[#2874f0] px-6 py-3 text-white"
      >
        Shop Now
      </Link>

    </div>
  );
};

export default EmptyCart;