import React, { useState } from "react";
import AdminNavbar from "./navbar";
import AdminSidebar from "./sidebar";
import ProductsDashboard from "./products/products-dashboard";
import OrdersDashboard from "./orders/orders-dasboard";

const AdminDashboard = () => {
    const [tabs, setTabs] = useState("overview");

    const handleTabs = (tab) => setTabs(tab);

    return (
        <div className="bg-[#F2F2F2]">

            <AdminNavbar />

            <div className="flex">
                <AdminSidebar handleTabs={handleTabs}/>
                    {tabs === "products" && <ProductsDashboard />}
                    {tabs === "orders" && <OrdersDashboard />}
            </div>
        </div>
    );
};

export default AdminDashboard;
