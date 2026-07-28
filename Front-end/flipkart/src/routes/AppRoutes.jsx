import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Categories from "../pages/admin/Categories";
import AdminRoute from "./AdminRoute";
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import EditProduct from "../pages/admin/EditProduct";
import AddProduct from "../pages/admin/AddProduct";
import Orders from "../pages/Orders";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminUsers from "../pages/admin/AdminUsers";
import ForgotPassword from "../pages/ForgotPassword";




const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<ProtectedRoute> <Cart /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /> </ProtectedRoute>} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
      <Route path="/admin/categories" element={<AdminRoute><Categories /></AdminRoute>} />
      <Route path="/admin/products" element={<AdminRoute><Products /></AdminRoute>} />
      <Route path="/admin/products/:id/edit" element={<EditProduct />} />
      <Route path="/admin/products/add" element={<AddProduct />} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
      <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />

    </Routes>
  );
};

export default AppRoutes;