import React, { useState } from "react";
import AdminNavbar from "./navbar";
import AdminSidebar from "./sidebar";
import ProductsDashboard from "./dashboard";

const AdminDashboard = () => {
    const [tabs, setTabs] = useState("overview");

    const handleTabs = (tab) => setTabs(tab);

    return (
        <div className="bg-[#F2F2F2]">

            <AdminNavbar />

            <div className="flex">
                <AdminSidebar handleTabs={handleTabs}/>
                    {tabs === "products" && <ProductsDashboard />}
            </div>
        </div>
    );
};

export default AdminDashboard;
