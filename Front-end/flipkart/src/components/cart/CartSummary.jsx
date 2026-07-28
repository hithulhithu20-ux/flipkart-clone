import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartSummary = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
  } = useCart();

  const totalMRP = cartItems.reduce(
    (sum, item) =>
      sum +
      item.originalPrice *
        item.quantity,
    0
  );

  const discount =
    totalMRP - cartTotal;

  return (
    <div className="h-fit bg-white">

      <div className="border-b p-4 text-gray-500">
        PRICE DETAILS
      </div>

      <div className="space-y-4 p-4">

        <div className="flex justify-between">
          <span>
            Price ({cartItems.length} items)
          </span>

          <span>
            ₹{totalMRP}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>

          <span className="text-green-600">
            -₹{discount}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>

          <span className="text-green-600">
            FREE
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">

          <span>Total</span>

          <span>
            ₹{cartTotal}
          </span>

        </div>

        <button
          onClick={() =>
            navigate("/checkout")
          }
          className="mt-4 w-full bg-[#fb641b] py-4 text-white"
        >
          PLACE ORDER
        </button>

      </div>

    </div>
  );
};

export default CartSummary;