import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import { FiArrowLeft, FiShoppingBag, FiPackage, FiCheckCircle, FiClock } from "react-icons/fi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/orders/myorders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-5 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                My Orders
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Track status and review history of your purchases.
              </p>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 border border-gray-200 bg-white text-gray-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-xs"
            >
              <FiArrowLeft size={16} />
              <span>Back</span>
            </button>
          </div>

          {/* LOADING STATE */}
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4 border-4 border-t-transparent border-gray-200 rounded-full" />
              <p className="text-gray-500 font-medium text-sm">Loading order timeline history...</p>
            </div>
          ) : orders.length === 0 ? (
            
            /* EMPTY STATE */
            <div className="max-w-md mx-auto text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 px-6">
              <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiShoppingBag size={36} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No orders found
              </h2>
              <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                Looks like you haven't bought anything yet. Your order summaries will appear here!
              </p>
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition-all shadow-md shadow-blue-100"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            
            /* ORDERS TIMELINE CONTAINER */
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  {/* TOP HEADER SUMMARY STRIP */}
                  <div className="bg-gray-50/70 border-b border-gray-100 px-5 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-sm">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                        Order ID
                      </p>
                      <p className="font-mono text-gray-700 font-medium break-all selection:bg-blue-100">
                        {order._id}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      {order.createdAt && (
                        <div className="text-left sm:text-right">
                          <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                            Date Placed
                          </p>
                          <p className="text-gray-600 font-medium">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short', year: 'numeric'
                            })}
                          </p>
                        </div>
                      )}

                      <div>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl tracking-wide uppercase ${
                            order.isDelivered
                              ? "bg-green-50 text-green-700 border border-green-100"
                              : "bg-amber-50 text-amber-700 border border-amber-100"
                          }`}
                        >
                          {order.isDelivered ? (
                            <>
                              <FiCheckCircle size={14} />
                              <span>Delivered</span>
                            </>
                          ) : (
                            <>
                              <FiClock size={14} className="animate-spin-slow" />
                              <span>Processing</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ITEMS INNER LOOP ROWS */}
                  <div className="divide-y divide-gray-50 px-5">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex gap-4 py-4 items-center">
                        <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-gray-400">
                          {item.image ? (
                            <img
                              src={item.image}
                              className="w-full h-full object-cover"
                              alt={item.name}
                            />
                          ) : (
                            <FiPackage size={20} />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Qty: <span className="font-medium text-gray-700">{item.qty}</span> • ₹{item.price.toLocaleString('en-IN')} each
                          </p>
                        </div>

                        <p className="text-sm font-bold text-gray-900 text-right whitespace-nowrap">
                          ₹{(item.price * item.qty).toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* TOTAL CARD FOOTER SUMMARY */}
                  <div className="bg-gray-50/30 border-t border-gray-50 px-5 py-4 flex justify-between items-center text-base">
                    <span className="text-sm font-medium text-gray-500">Grand Total</span>
                    <span className="font-extrabold text-xl text-gray-900">
                      ₹{order.totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Orders;