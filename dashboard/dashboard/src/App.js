import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginScreen from "./Screen/LoginScreen";
import HomeScreen from "./Screen/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAsyncProducts } from "./features/productSlide/productSlice";
import * as PayService from "./Services/OrderSevice";
import { updatePay } from "./features/Order/Order";
import ProductScreen from "./Screen/ProductScreen";
import AddProduct from "./Screen/AddProductScreen";
import EditProductMain from "./Components/Product/EditProduct";
import EditProductScreen from "./Screen/EditProductSreen";
import OrderScreen from "./Screen/OrdersScreen";
import EditOrdersScreen from "./Screen/EditOrderScreen";
import UserMain from "./Components/User/Usermain";
import UserScreen from "./Screen/UserScreen";
import EditUserScreen from "./Screen/EditUserScreen";
import CategoryScreen from "./Screen/CategoryScreen";
import AddCategory from "./Screen/AddCategorySreen";
import PrivateRoutes from "./PrivateRouter";
import * as UserService from "./Services/UserService";
import { updateUser } from "./features/userSlide/userSlide";
import jwt_decode from "jwt-decode";
import { isJsonString } from "./utils";

function App() {
  const userLogin = useSelector((state) => state.user);
  // const location = useLocation();

  const dispatch = useDispatch();
  const { email } = userLogin;
  const pageNumber = 1;

  useEffect(() => {
    if (email !== "") {
      dispatch(fetchAsyncProducts());
      // hangldeGetAll()
    }
  }, [dispatch]);


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products" element={<ProductScreen />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/orders" element={<OrderScreen />} />
          <Route path="/users" element={<UserScreen />} />
          <Route path="/category" element={<CategoryScreen />} />
          <Route path="/addcategory" element={<AddCategory />} />

          <Route path="/users/:id/edit" element={<EditUserScreen />} />

          <Route path="/product/:id/edit" element={<EditProductScreen />} />
          <Route path="/orders/:id/edit" element={<EditOrdersScreen />} />
        </Route>
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
