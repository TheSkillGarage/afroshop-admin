import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  AddNewRole,
  Orders,
  OverviewPage,
  Products,
  ProfilePage,
  RolesAndPermissionsDashboard,
  ViewOrdersPage,
  SupportPage,
  AddProducts,
  EditProducts,
  PasswordSucess,
  StoreCreated,
  PasswordReset,
  EmailVerification,
  SignUpPage,
  LogInPage,
  NewPasswordPage,
} from "./pages";
import EditRole from "./components/roles-and-permissions/edit-role";
import RedirectHandler from "./components/redirectHandler";
import { PageNotFoundComponent } from "./components";
import { useSelector } from "react-redux";

const MyRoutes = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={isAuthenticated ? <OverviewPage /> : <Navigate to="/login" />} />
        <Route path="/connect/:provider/redirect" element={<RedirectHandler />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/new" element={<AddProducts />} />
        <Route exact path="/products/edit/:sku" element={<EditProducts />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/view-order/:orderID" element={<ViewOrdersPage />} />
        <Route
          exact
          path="/roles-and-permissions"
          element={<RolesAndPermissionsDashboard />}
        />
        <Route exact path="/add-new-role" element={<AddNewRole />} />
        <Route exact path="/support" element={<SupportPage />} />
        <Route exact path="/roles-and-permissions/add-new-role" element={<AddNewRole />} />
        <Route exact path="/roles-and-permissions/edit-role/:id" element={<EditRole />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/reset-successful" element={<PasswordSucess />} />
        <Route exact path="/store-created" element={<StoreCreated />} />
        <Route exact path="/reset-password" element={<PasswordReset />} />
        <Route exact path="/verify-email" element={<EmailVerification />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/login" element={<LogInPage />} />
        <Route exact path="/new-password" element={<NewPasswordPage />} />
        <Route exact path="/404" element={<PageNotFoundComponent />} />
        <Route exact path="/*" element={<PageNotFoundComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
