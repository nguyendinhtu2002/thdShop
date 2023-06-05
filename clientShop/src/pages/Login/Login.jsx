import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import React, { useEffect, useState } from "react";
import Input from "./input";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService"
import { updateUser } from '../../features/userSlide/userSlide';
import Toast from '../../components/LoadingError/Toast';
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";

const schema = yup.object({

  username: yup.string().required("Username is a required field"),

  password: yup.string().min(6, "Password must be at least 6 characters"),
});
const provider = new GoogleAuthProvider();

function Login() {

  const dispatch = useDispatch()
  const location = useLocation();
  const history = useNavigate();

  const toastId = React.useRef(null);
  const Toastobjects = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
 
  const userLogin = useSelector((state) => state.user);
  const { email } = userLogin;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        navigate("/");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )
 
  const formSubmit = (data) => {
    mutation.mutate(
      data
    )
  };
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }
  const { data, error, isLoading, isError, isSuccess } = mutation

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);
  useEffect(() => {
    if (error === null && isSuccess) {

      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      if (data?.access_token) {
        const decoded = jwt_decode(data?.access_token)
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id.id, data?.access_token)
        }
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success("Thành công", Toastobjects);
        }
      }


      // dispatch(updateUser({ data }))
    }
    else if (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(error.response.data.error, Toastobjects);
      }
    }

    if (email !== "") {
      history('/');

    }


  }, [isSuccess, email, history, error])
  return (
    <>
      <Toast />
      <div className="login-page">
        <div className="login-wrapper">
          <div className="login-title">
            <h4>Đăng nhập</h4>
          </div>
          <form className="login-body" onSubmit={handleSubmit(formSubmit)} >
         <Input
              id="username"
              label="Username"
              type="text"
              placeholder="Enter Username"
              register={{ ...register("username") }}
              errorMessage={errors.username?.message}
            />

            <Input
              id="Password"
              label="Password"
              type="password"
              placeholder="Enter Password"
              register={{ ...register("password") }}
              errorMessage={errors.password?.message}
            />

           
            <div className="login-footer">
              <button >ĐĂNG NHẬP</button>
              <button className="login-gg" onClick={handleLogin}>
                ĐĂNG NHẬP VỚI GOOGLE
              </button>

              <Link to={"/register"}>
                <span>Bạn chưa có tài khoản?</span>
              </Link>
            </div>
          </form>
        
        </div >
      </div >

    </>
  );
}

export default Login;
