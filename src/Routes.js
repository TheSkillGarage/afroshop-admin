import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App} from "./pages";
import ProductImage from "./components/ProductImage";


const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/new-product" element={<ProductImage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
