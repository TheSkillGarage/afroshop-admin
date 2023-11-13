import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App} from "./pages";
import AdminDashboard from "./components/store-admin";




const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/store-admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
