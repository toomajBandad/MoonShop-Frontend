import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Topbar from "./components/Topbar/Topbar";
import Profile from "./pages/Profile/Profile";
import MenuTop from "./components/MenuTop/MenuTop";
import Search from "./pages/Search/Search";
import Product from "./pages/Product/Product";
import { ToastContainer } from "react-toastify";
import ShopingCart from "./pages/ShopingCart/ShopingCart";
import Admin from "./pages/Admin/Admin";
import Review from "./pages/Review/Review";

export default function App() {
  return (
    <div className="app__container bg-white">
      <BrowserRouter>
        <Topbar />
        <MenuTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search/:param" element={<Search />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/shopingCart/:userId" element={<ShopingCart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/review/:id" element={<Review />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        className="text-sm"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover={false}
        draggable={false}
      />
    </div>
  );
}
