import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AddNewRole,
  DashboardPage,
  Orders,
  OverviewPage,
  Products,
  RolesAndPermissionsDashboard,
  ViewOrdersPage,
  WelcomePage,
} from "./pages";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<OverviewPage />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/view-order/:orderID" element={<ViewOrdersPage />} />
        <Route
          exact
          path="/roles-and-permissions"
          element={<RolesAndPermissionsDashboard />}
        />
        <Route exact path="/add-new-role" element={<AddNewRole />} />
        <Route exact path="/welcome" element={<WelcomePage/>} />
        <Route exact path="/dashboard" element={<DashboardPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
