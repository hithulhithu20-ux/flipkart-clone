import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const OrderSummary = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
  } = useCart();

  const placeOrder = () => {
    navigate("/order-success");
  };

  return (
    <div className="h-fit bg-white">

      <div className="border-b p-4 text-gray-500">
        ORDER DETAILS
      </div>

      <div className="p-4">

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="mb-3 flex justify-between"
          >
            <span>
              {item.name}
            </span>

            <span>
              ₹{item.price}
            </span>
          </div>
        ))}

        <hr className="my-4" />

        <div className="flex justify-between text-xl font-bold">

          <span>Total</span>

          <span>
            ₹{cartTotal}
          </span>

        </div>

        <button
          onClick={placeOrder}
          className="mt-5 w-full bg-[#fb641b] py-4 text-white"
        >
          PLACE ORDER
        </button>

      </div>

    </div>
  );
};

export default OrderSummary;