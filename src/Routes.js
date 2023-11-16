import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App} from "./pages";
import ViewOrders from "./components/store-admin/orders/view-orders";




const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/view-orders" element={<ViewOrders />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
