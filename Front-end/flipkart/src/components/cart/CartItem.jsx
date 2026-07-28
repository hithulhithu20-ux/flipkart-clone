import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const {
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  return (
    <div className="border-b p-5">

      <div className="flex flex-col gap-5 md:flex-row">

        <img
          src={item.images?.[0] || item.image}
          alt={item.name}
          className="h-40 w-full object-cover md:w-40"
        />

        <div className="flex-1">

          <h3 className="text-xl font-medium">
            {item.name}
          </h3>

          <p className="mt-2 text-gray-500">
            {item.brand}
          </p>

          <div className="mt-3">

            <span className="text-2xl font-bold">
              ₹{item.price}
            </span>

            <span className="ml-3 text-gray-500 line-through">
              ₹{item.originalPrice}
            </span>

          </div>

          <div className="mt-4 flex items-center gap-3">

            <button
              onClick={() =>
                decreaseQty(item.id)
              }
              className="h-8 w-8 rounded-full border"
            >
              -
            </button>

            <span>
              {item.quantity}
            </span>

            <button
              onClick={() =>
                increaseQty(item.id)
              }
              className="h-8 w-8 rounded-full border"
            >
              +
            </button>

          </div>

          <div className="mt-4 flex gap-6">

            <button className="font-medium">
              SAVE FOR LATER
            </button>

            <button
              onClick={() =>
                removeFromCart(item.id)
              }
              className="font-medium"
            >
              REMOVE
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CartItem;