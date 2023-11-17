import React from "react";
import AdminNavbar from "../store-admin/navbar";
import AdminSidebar from "../store-admin/sidebar";


const PageLayout = ({ children }) => {

  return (
    <section className="bg-[#F2F2F2]">
      <AdminNavbar />

      <div className="flex">
        <AdminSidebar />
        <div className="bg-white w-full h-full flex flex-col gap-[60px] md:gap-[80px] large-screen">
          {children}
        </div>
      </div>

    </section>
  );
};

export default PageLayout;
