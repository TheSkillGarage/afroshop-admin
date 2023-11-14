import React, { useState } from "react";
import AdminNavbar from "../store-admin/navbar";
import AdminSidebar from "../store-admin/sidebar";


const PageLayout = ({ children }) => {

  const [tabs, setTabs] = useState("overview");

  const handleTabs = (tab) => setTabs(tab);

  return (
    <section className="bg-[#F2F2F2]">
      <AdminNavbar />

      <div className="flex">
        <AdminSidebar handleTabs={handleTabs} />
        <div className="bg-white w-full h-full flex flex-col gap-[60px] md:gap-[80px] large-screen">

          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { tabs });
            }
            return child;
          })}

        </div>
      </div>

    </section>
  );
};

export default PageLayout;
