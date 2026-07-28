import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";
import { 
  FiShoppingBag, FiTruck, FiClock, FiCheckCircle, 
  FiSearch, FiRefreshCw, FiEye, FiMoreVertical, 
  FiLoader
} from "react-icons/fi";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to load global order registries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, currentDeliveryState) => {
    try {
      const token = localStorage.getItem("token");
      // Seamless delivery toggling route configuration
      await api.put(`/admin/orders/${orderId}/deliver`, 
        { isDelivered: !currentDeliveryState },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders(); // Sync view states natively
    } catch (err) {
      console.error("Failed to update execution process mapping:", err);
    }
  };

  // Advanced client-side quick-searching and workflow filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === "all") return matchesSearch;
    if (statusFilter === "delivered") return matchesSearch && order.isDelivered;
    if (statusFilter === "processing") return matchesSearch && !order.isDelivered;
    return matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 max-w-7xl mx-auto select-none animate-in fade-in duration-200">
        
        {/* HEADER AREA SECTION */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <FiShoppingBag size={22} />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-tight">Order Fulfilments</h1>
              <p className="text-xs text-gray-400 mt-0.5">Track, audit, and change fulfillment milestones.</p>
            </div>
          </div>

          <button 
            onClick={fetchOrders}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 px-3 py-2 rounded-xl transition-colors"
          >
            <FiRefreshCw size={13} className={loading ? "animate-spin" : ""} />
            <span>Reload Feeds</span>
          </button>
        </div>

        {/* WORKSPACE SELECTION CONTROL PANELS */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative flex items-center bg-white rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <FiSearch className="absolute left-4 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search by Client Name, Email or Identity Token..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-transparent outline-none text-xs font-semibold text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-200 text-xs font-bold text-gray-600 px-4 py-3 rounded-xl outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Lifecycles</option>
            <option value="processing">Processing Queues</option>
            <option value="delivered">Completed Deliveries</option>
          </select> */}
        </div>

        {/* DATA CONTAINER MANAGEMENT CORE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100">
            <FiLoader className="animate-spin text-blue-500 mb-2" size={24} />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Syncing ledger records...</span>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <p className="text-sm font-bold text-gray-400">No active orders match your criteria.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-100">
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Client / Account</th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Line Items Cart</th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Financial Net</th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Fulfillment State</th>
                    {/* <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Operational Actions</th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors group">
                      
                      {/* CLIENT ACCOUNT INFO */}
                      <td className="p-4">
                        <div className="font-bold text-gray-800">{order.user?.name || "Anonymous Guest"}</div>
                        <div className="text-gray-400 font-medium mt-0.5">{order.user?.email || "no-email-linked"}</div>
                        <div className="text-[10px] font-mono text-gray-300 mt-1 select-all">ID: {order._id}</div>
                      </td>

                      {/* CART ITEMS BREAKDOWN */}
                      <td className="p-4 max-w-xs">
                        <div className="space-y-1">
                          {order.orderItems?.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-gray-50/80 rounded-lg px-2 py-1 text-[11px] font-semibold text-gray-600">
                              <span className="truncate max-w-[160px]" title={item.name}>{item.name}</span>
                              <span className="text-gray-400 shrink-0 ml-2">×{item.qty}</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* TOTAL EXPENDITURE */}
                      <td className="p-4">
                        <span className="text-sm font-black text-gray-900">
                          ₹{order.totalPrice?.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </span>
                      </td>

                      {/* DYNAMIC PIPELINE DELIVER STATE BADGES */}
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          order.isDelivered 
                            ? "bg-green-50 text-green-700 ring-1 ring-green-600/10" 
                            : "bg-amber-50 text-amber-700 ring-1 ring-amber-600/10"
                        }`}>
                          {order.isDelivered ? <FiCheckCircle size={11} /> : <FiClock size={11} />}
                          <span>{order.isDelivered ? "Delivered" : "Processing"}</span>
                        </span>
                      </td>

                      {/* SYSTEM ROW DISPATCH CONTROLS */}
                      {/* <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleUpdateStatus(order._id, order.isDelivered)}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-all active:scale-[0.97] ${
                              order.isDelivered
                                ? "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                                : "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
                            }`}
                          >
                            <FiTruck size={12} />
                            <span>{order.isDelivered ? "Mark Processing" : "Mark Shipped"}</span>
                          </button>
                        </div>
                      </td> */}

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminOrders;