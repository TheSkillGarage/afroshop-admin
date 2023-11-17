import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Orders, OverviewPage, Products } from "./pages";


const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<OverviewPage />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
