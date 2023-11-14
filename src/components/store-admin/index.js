import React from "react";
import ProductsDashboard from "./products/products-dashboard";
import OrdersDashboard from "./orders/orders-dasboard";


const AdminDashboard = ({tabs}) => {

    return (
         <div >
            {tabs === "products" && <ProductsDashboard />}
            {tabs === "orders" && <OrdersDashboard />}
        </div>
    );
};

export default AdminDashboard;
