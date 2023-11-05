import React from "react";
import AdminNavbar from "./navbar";
import AdminSidebar from "./sidebar";
import OrdersDashboard from "./dashboard";

const AdminDashboard = () => {
    return (
        <div className="bg-[#F2F2F2]">

            <AdminNavbar />

            <div className="flex">
                <AdminSidebar />
                    <OrdersDashboard />
            </div>
        </div>
    );
};

export default AdminDashboard;
