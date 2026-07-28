import MainLayout from "../layouts/MainLayout";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQty, clearCart } = useCart();

  // Calculate Subtotal and Total Quantities
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  
  // Optional values for a more realistic summary card
  const shippingFee = totalPrice > 500 || totalPrice === 0 ? 0 : 40; 
  const grandTotal = totalPrice + shippingFee;

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-5 mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Shopping Cart
              </h1>
              {cartItems.length > 0 && (
                <p className="mt-2 text-sm text-gray-500">
                  You have <span className="font-semibold text-gray-700">{totalItemsCount}</span> {totalItemsCount === 1 ? 'item' : 'items'} in your cart.
                </p>
              )}
            </div>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-150 flex items-center gap-1 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg"
              >
                Clear Cart
              </button>
            )}
          </div>

          {/* EMPTY STATE */}
          {cartItems.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 px-6">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                Looks like you haven't added anything to your cart yet. Explore our awesome collection!
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition-all shadow-md shadow-blue-200 hover:shadow-lg"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            
            /* CONTENT GRID */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

              {/* LEFT SIDE - ITEMS LIST */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Image Wrap */}
                    <div className="w-full sm:w-28 h-28 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <img
                        src={item.images?.[0]?.url || 'https://via.placeholder.com/150'}
                        className="w-full h-full object-cover mix-blend-multiply"
                        alt={item.name}
                      />
                    </div>

                    {/* Product info details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h2 className="font-semibold text-lg text-gray-900 line-clamp-2">
                            {item.name}
                          </h2>
                          <p className="font-bold text-lg text-gray-900 whitespace-nowrap">
                            ₹{(item.price * item.qty).toLocaleString('en-IN')}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          ₹{item.price.toLocaleString('en-IN')} each
                        </p>
                      </div>

                      {/* Controls Row */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-1">
                          <button
                            onClick={() => updateQty(item._id, item.qty - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white hover:text-blue-600 rounded-md transition-all font-semibold disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-600"
                            disabled={item.qty <= 1}
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-medium text-gray-800 text-sm">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item._id, item.qty + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white hover:text-blue-600 rounded-md transition-all font-semibold"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Action */}
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-16v1a3 3 0 003 3h10M9 3h6m-6 0a1 1 0 001-1h4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* RIGHT SIDE - SUMMARY CARD */}
              <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl h-fit lg:sticky lg:top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">
                  Order Summary
                </h2>

                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Price ({totalItemsCount} items)</span>
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

                  {shippingFee > 0 && (
                    <p className="text-xs text-green-600 bg-green-50 p-2 rounded-lg">
                      💡 Add ₹{500 - totalPrice} more to get <b>FREE Delivery</b>!
                    </p>
                  )}

                  <hr className="border-gray-100 my-2" />

                  <div className="flex justify-between text-base pt-2">
                    <span className="font-bold text-gray-900">Total Amount</span>
                    <span className="font-extrabold text-xl text-gray-900">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Primary Actions */}
                <button
                  onClick={goToCheckout}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-xl mt-6 transition-all shadow-md shadow-blue-100 hover:shadow-lg flex items-center justify-center gap-2 text-base"
                >
                  <span>Proceed to Checkout</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <Link
                  to="/"
                  className="w-full inline-flex justify-center items-center text-sm font-medium text-blue-600 hover:text-blue-700 mt-4 py-2 transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>

            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;