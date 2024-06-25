import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Featured from "./components/Featured";
import TopSelling from "./components/TopSelling";
import Detail from "./components/pages/Detail";
import { EcomProvider } from "./context/EcomContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/pages/Products";
import Footer from "./components/Footer";
import Checkout from "./components/pages/Checkout";
import Cart from "./components/pages/Cart";
import Alert from "./components/Alert";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import ThankYou from "./components/pages/ThankYou";
import useLocalStorage from "./hooks/useLocalStorage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const { getItem } = useLocalStorage("auth-token");
  const token = getItem();
  let authInitialState = { accessToken: token ?? null };

  return (
    <AuthProvider defaultState={authInitialState}>
      <EcomProvider>
        <Router>
          <Header />
          <Alert />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Carousel />
                  <Featured />
                  <TopSelling />
                </>
              }
            />
            <Route path="/products" element={<Products />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/thankyou" element={<ThankYou />} />
          </Routes>
          <Footer />
        </Router>
      </EcomProvider>
    </AuthProvider>
  );
}

export default App;
