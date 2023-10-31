import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App} from "./pages";



const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
