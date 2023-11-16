import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App} from "./pages";
import ViewOrders from "./components/store-admin/orders/view-orders";


import { StoreAdmin } from "./pages";


const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<StoreAdmin />} />
        <Route exact path="/view-orders" element={<ViewOrders />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
