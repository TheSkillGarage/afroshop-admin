import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import {
  AddNewRole,
  DashboardPage,
  Orders,
  OverviewPage,
  Products,
  ProfilePage,
  RolesAndPermissionsDashboard,
  ViewOrdersPage,
  WelcomePage,
  SupportPage,
  AddProducts,
  EditProducts,
  PasswordSucess,
  StoreCreated,
  PasswordReset,
  EmailVerification,
} from "./pages";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/" element={<OverviewPage />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/new" element={<AddProducts />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/view-order/:orderID" element={<ViewOrdersPage />} />
        <Route
          exact
          path="/roles-and-permissions"
          element={<RolesAndPermissionsDashboard />}
        />
        <Route exact path="/add-new-role" element={<AddNewRole />} />
        <Route exact path="/dashboard" element={<DashboardPage/>} />
        <Route exact path="/support" element={<SupportPage />} />
        <Route exact path="/roles-and-permissions/add-new-role" element={<AddNewRole />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/products/edit/:sku" element={<EditProducts />} />
        <Route exact path="/reset-successful" element={<PasswordSucess />} />
        <Route exact path="/store-created" element={<StoreCreated />} />
        <Route exact path="/reset-password" element={<PasswordReset />} />
        <Route exact path="/verify-email" element={<EmailVerification />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
