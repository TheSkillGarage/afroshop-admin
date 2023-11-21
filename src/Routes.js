import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Orders, OverviewPage, Products } from "./pages";
import ViewOrders from "./components/orders/view-orders";


const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<OverviewPage />} />
        <Route exact path="/view-order" element={<ViewOrders />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
