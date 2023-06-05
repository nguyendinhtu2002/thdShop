import "./App.scss";
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import {store} from "./store/store";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import { Provider } from "react-redux";
import {
  CartPage,
  CategoryProductPage,
  HomePage,
  ProductSinglePage,
  SearchPage,
 
} from "./pages/index.jsx";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <ShoppingCart/>
          <Header />
          <Sidebar />

          <Routes>
          
            {/* home page route */}
            <Route path="/" element={<HomePage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* single product route */}
            <Route path="/product/:id" element={<ProductSinglePage />} />
            {/* category wise product listing route */}
            <Route path="/category/:category" element={<CategoryProductPage />} />
            {/* cart */}
            <Route path="/cart" element={<CartPage />} />
            {/* searched products */}
            <Route path="/search/:searchTerm" element={<SearchPage />} />
          </Routes>

          <Footer />

        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
