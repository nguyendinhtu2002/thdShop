import Input from "./input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Register.scss";
import { Link } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService"
import React, { useEffect, useState } from "react";
import Toast from '../../components/LoadingError/Toast';
import { toast } from 'react-toastify';
const schema = yup.object({

  username: yup.string().required("Username is a required field"),
  phone: yup
    .string()
    .required("PhoneNumber is a required field")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
  email: yup.string().required("Email is a required field").email("Email is not valid!."),
  password: yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Password must be match."),
});

function Register() {

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  
  const mutation = useMutationHooks(
    data => UserService.registerUser(data)
  )
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
  const formSubmit = (data) => {
    mutation.mutate(
      data
    )
  };
  const { data, error, isLoading, isError, isSuccess } = mutation

  useEffect(() => {
    if (!error && isSuccess) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Thành công", Toastobjects);
      }
    }
    else if (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(error.response.data.message, Toastobjects);
      }
    }


  }, [isSuccess, error])
  return (
    <>
      <Toast />
      <div className="register-page">
        <div className="register-wrapper">
          <div className="register-title">
            <h4>Đăng ký</h4>
          </div>
          <form className="register-body" onSubmit={handleSubmit(formSubmit)}>
            <Input
              id="username"
              label="Username"
              type="text"
              placeholder="Enter Username"
              register={{ ...register("username") }}
              errorMessage={errors.username?.message}
            />

            <Input
              id="phoneNumber"
              label="PhoneNumber"
              type="text"
              placeholder="Enter PhoneNumber"
              register={{ ...register("phone") }}
              errorMessage={errors.phoneNumber?.message}
            />
            <Input
              id="Email"
              label="Email"
              type="email"
              placeholder="Enter Email"
              register={{ ...register("email") }}
              errorMessage={errors.email?.message}
            />
            <Input
              id="Password"
              label="Password"
              type="password"
              placeholder="Enter Password"
              register={{ ...register("password") }}
              errorMessage={errors.password?.message}
            />
            <Input
              id="ConfirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm PassWord"
              register={{ ...register("confirmPassword") }}
              errorMessage={errors.confirmPassword?.message}
            />
            <div className="register-footer">
              <button>ĐĂNG KÝ</button>
              <Link to={"/login"}>
                <span>Bạn đã có tài khoản?</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
