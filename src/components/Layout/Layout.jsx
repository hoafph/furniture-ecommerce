import AdminNav from "admin/AdminNav";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import React from "react";
import { useLocation } from "react-router-dom";
import Routers from "routers/Routers";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header />}
      <div>
        <Routers />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
