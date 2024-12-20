// import axios from 'axios'
// import React from 'react'
// import {useNavigate} from "react-router-dom";
// import useAuth from "./useAuth";

// const axiosSecure = axios.create({
//     baseURL: 'http://localhost:8000'
// })

// const useAxiosSecure = () => {
//   const navigate = useNavigate();
//   const {logOut} = useAuth();

//   axiosSecure.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     const token = localStorage.getItem('access-token');
//     config.headers.authorization = `Bearer ${token}`
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }); 

//   //Add a response interceptor
//   axiosSecure.interceptors.response.use(function (response) {
//     return response;
//   }, async (error) => {
//     const status = error.response.status;

//     if(status === 401 || status === 403){
//       await logOut();
//       navigate("/login")
//     }
//     return Promise.reject(error);
//   });

//   return axiosSecure
// }

// export default useAxiosSecure;

import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your actual API base URL
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    // Attach request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Attach response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to eject interceptors when the component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]); // Dependencies: ensure these are stable references

  return axiosSecure;
};

export default useAxiosSecure;
 