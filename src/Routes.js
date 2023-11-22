import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Orders, OverviewPage, Products, ViewOrdersPage,  } from "./pages";


const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<OverviewPage />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/view-order/:orderID" element={<ViewOrdersPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
