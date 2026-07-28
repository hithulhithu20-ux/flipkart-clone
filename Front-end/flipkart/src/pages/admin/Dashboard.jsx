import AdminLayout from "../../layouts/AdminLayout";
import StatCard from "../../components/admin/StatCard";
import { useProducts } from "../../context/ProductContext";
import { useCategories } from "../../context/CategoryContext";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { 
  FiBox, 
  FiGrid, 
  FiShoppingBag, 
  FiUsers, 
  FiArrowUpRight, 
  FiActivity 
} from "react-icons/fi";

const Dashboard = () => {
  const { products } = useProducts();
  const { categories } = useCategories();

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [ordersRes, usersRes] = await Promise.all([
          api.get("/admin/orders", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setOrders(ordersRes.data.orders || []);
        setUsers(usersRes.data.users || []);
      } catch (err) {
        console.error("Error fetching administrative analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8 bg-gray-50/50 min-h-screen p-1 sm:p-4">
        
        {/* DASHBOARD TITLE SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Real-time platform metrics, store performance, and recent activity logs.
            </p>
          </div>
          
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider self-start sm:self-center">
            <FiActivity className="animate-pulse" size={14} />
            <span>Live System Active</span>
          </div>
        </div>

        {/* ANALYTICS STAT CARDS GRID */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Products"
            value={loading ? "..." : products.length}
            icon={<FiBox size={20} />}
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard
            title="Categories"
            value={loading ? "..." : categories.length}
            icon={<FiGrid size={20} />}
            color="text-emerald-600"
            bgColor="bg-emerald-50"
          />
          <StatCard
            title="Total Orders"
            value={loading ? "..." : orders.length}
            icon={<FiShoppingBag size={20} />}
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
          <StatCard
            title="Registered Users"
            value={loading ? "..." : users.filter((u) => u.role !== "admin").length}
            icon={<FiUsers size={20} />}
            color="text-purple-600"
            bgColor="bg-purple-50"
          />
        </div>

        {/* LOADING SHIMMER STATE */}
        {loading ? (
          <div className="grid gap-6 lg:grid-cols-3 mt-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4 shadow-xs animate-pulse">
                <div className="h-5 w-1/3 bg-gray-200 rounded-lg" />
                <div className="space-y-3 pt-2">
                  <div className="h-10 bg-gray-100 rounded-xl" />
                  <div className="h-10 bg-gray-100 rounded-xl" />
                  <div className="h-10 bg-gray-100 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          
          /* CONTENT LOG MANAGEMENT SECTION */
          <div className="grid gap-6 lg:grid-cols-3">
            
            {/* RECENT PRODUCTS */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-50">
                  <h2 className="text-base font-bold text-gray-900">Recent Products</h2>
                  <button className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-0.5">
                    <span>View All</span>
                    <FiArrowUpRight size={14} />
                  </button>
                </div>

                <div className="divide-y divide-gray-50">
                  {products.slice(0, 5).map((product) => (
                    <div key={product._id} className="flex items-center justify-between py-3 group hover:bg-gray-50/50 px-1 rounded-lg transition-colors">
                      <div className="min-w-0 pr-2">
                        <p className="font-semibold text-sm text-gray-800 truncate">{product.name}</p>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">{product.brand || "Generic Brand"}</p>
                      </div>
                      <span className="font-bold text-sm text-gray-900 bg-gray-50 px-2.5 py-1 rounded-lg">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RECENT ORDERS (Now safely un-commented, complete with status tracking tags!) */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-50">
                  <h2 className="text-base font-bold text-gray-900">Recent Orders</h2>
                  <button className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-0.5">
                    <span>Manage</span>
                    <FiArrowUpRight size={14} />
                  </button>
                </div>

                <div className="divide-y divide-gray-50">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order._id} className="flex items-center justify-between py-3 group hover:bg-gray-50/50 px-1 rounded-lg transition-colors">
                      <div className="min-w-0 pr-2">
                        <p className="font-semibold text-sm text-gray-800 truncate">
                          {order.user?.name || "Guest Checkout"}
                        </p>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">
                          {order.orderItems?.length || 0} items • {order.isDelivered ? "Delivered" : "Pending"}
                        </p>
                      </div>
                      <span className={`font-bold text-sm px-2.5 py-1 rounded-lg ${
                        order.isDelivered ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"
                      }`}>
                        ₹{order.totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CATEGORIES CONTAINER */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-50">
                  <h2 className="text-base font-bold text-gray-900">Active Categories</h2>
                  <button className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-0.5">
                    <span>Configure</span>
                    <FiArrowUpRight size={14} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {categories.map((category) => (
                    <div
                      key={category._id}
                      className="text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200/60 px-3 py-2 rounded-xl hover:bg-gray-200 transition-colors cursor-default"
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default Dashboard;