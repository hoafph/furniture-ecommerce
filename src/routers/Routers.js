import Cart from "pages/Cart";
import Checkout from "pages/Checkout";
import Home from "pages/Home";
import Login from "pages/Login";

import ProductDetails from "pages/ProductDetails";
import Shop from "pages/Shop";
import Signup from "pages/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import AddProduct from "admin/AddProduct";
import AllProducts from "admin/AllProducts";
import Dashboard from "admin/Dashboard";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />

      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetails />} />

      <Route path="cart" element={<Cart />} />

      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/all-products" element={<AllProducts />} />
        <Route path="dashboard/orders" element={<AddProduct />} />
      </Route>
      
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
};

export default Routers;
