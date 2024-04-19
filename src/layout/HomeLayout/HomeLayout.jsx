import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="container">{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
