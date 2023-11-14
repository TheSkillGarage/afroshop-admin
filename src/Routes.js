import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreAdmin } from "./pages";


const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<StoreAdmin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
