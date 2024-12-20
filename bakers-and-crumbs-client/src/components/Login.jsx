
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signUpWithGmail, login } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: data.name,
          email: data.email,
        };
        axiosPublic.post('/users', userInfor)
          .then((response) => {
            alert("Account Created Successfully");
            navigate(from, { replace: true });
          });
        alert("Login successful");
        navigate(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Please provide a valid email & password");
      });
    reset();
  };

  // Login with Google
  const handleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };

        axiosPublic.post('/users', userInfor)
          .then((response) => {
            alert("Account Created Successfully");
            navigate("/");
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg"> Please Login</h3>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: true })}
              className="input input-bordered w-full"
            />
            {errors.email && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register('password', { required: true })}
              className="input input-bordered w-full"
            />
            {errors.password && <span>This field is required</span>}
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div>
            <button type="submit" className="btn btn-primary w-full">Login</button>
          </div>
          <div className="divider">OR</div>
          <div className="flex justify-center space-x-4">
            <button type="button" className="btn btn-outline" onClick={handleLogin}>
              <FaGoogle /> Login with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
