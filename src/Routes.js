import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewOrders from "./components/store-admin/orders/view-orders";
import { StoreAdmin } from "./pages";


const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<StoreAdmin />} />
        <Route exact path="/view-order" element={<ViewOrders />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
