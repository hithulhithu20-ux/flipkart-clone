import { useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Calculate Subtotal
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty || item.quantity || 1),
    0
  );
  
  // Shipping logic matching your modern cart UI
  const shippingFee = totalPrice > 500 || totalPrice === 0 ? 0 : 40;
  const grandTotal = totalPrice + shippingFee;

  const placeOrder = async (e) => {
    e.preventDefault(); // Prevents page reload if wrapped in a form
    
    // Simple validation guard
    if (!address.address || !address.city || !address.state || !address.postalCode) {
      alert("Please fill out all address fields.");
      return;
    }

    const orderItems = cartItems.map((item) => ({
      product: item._id,
      name: item.name,
      image: item.images?.[0]?.url,
      price: item.price,
      qty: item.quantity || item.qty || 1,
    }));

    try {
      setLoading(true);
      await api.post("/orders", {
        orderItems,
        shippingAddress: address,
        totalPrice: grandTotal,
      });

      clearCart();
      navigate("/order-success");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while placing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* HEADER */}
          <div className="border-b border-gray-200 pb-5 mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Checkout
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Please enter your delivery details to complete your order.
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border p-6 max-w-md mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Can't check out without items!</p>
              <Link to="/" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium">
                Go Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* LEFT SIDE: SHIPPING ADDRESS FORM */}
              <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Delivery Address
                </h2>

                <form onSubmit={placeOrder} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="Flat/House No., Colony, Street name"
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="Mumbai"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        required
                        placeholder="Maharashtra"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Postal Code / PIN
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        placeholder="400001"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        disabled
                        value={address.country}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-500 font-medium cursor-not-allowed outline-none"
                      />
                    </div>
                  </div>

                  {/* Hidden button to enable HTML5 form submission via enter key */}
                  <button type="submit" className="hidden" />
                </form>
              </div>

              {/* RIGHT SIDE: ORDER SUMMARY CARD */}
              <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl h-fit lg:sticky lg:top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Review Your Order
                </h2>

                {/* mini items preview */}
                <div className="max-h-48 overflow-y-auto divide-y divide-gray-50 pr-1 mb-4 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex gap-3 py-3 items-center">
                      <img
                        src={item.images?.[0]?.url || 'https://via.placeholder.com/60'}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          Qty: {item.qty || item.quantity || 1}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                        ₹{((item.price) * (item.qty || item.quantity || 1)).toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3.5 text-sm pt-2 border-t border-gray-100">
                  <div className="flex justify-between text-gray-600">
                    <span>Items Subtotal</span>
                    <span className="font-medium text-gray-900">₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charges</span>
                    {shippingFee === 0 ? (
                      <span className="text-green-600 font-medium">FREE</span>
                    ) : (
                      <span className="font-medium text-gray-900">₹{shippingFee}</span>
                    )}
                  </div>

                  <hr className="border-gray-100 my-2" />

                  <div className="flex justify-between text-base pt-1">
                    <span className="font-bold text-gray-900">Total Amount</span>
                    <span className="font-extrabold text-xl text-gray-900">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={placeOrder}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3.5 rounded-xl mt-6 transition-all shadow-md shadow-green-100 hover:shadow-lg flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>
                      <span>Place Order (Cash on Delivery)</span>
                    </>
                  )}
                </button>

                <Link
                  to="/cart"
                  className="w-full inline-flex justify-center items-center text-sm font-medium text-gray-500 hover:text-gray-700 mt-4 py-1 transition-colors"
                >
                  Modify Items in Cart
                </Link>
              </div>

            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;