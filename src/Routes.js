import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App} from "./pages";
import AdminDashboard from "./components/admin-products";




const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
