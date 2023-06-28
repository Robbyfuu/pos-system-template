/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig,  InternalAxiosRequestConfig } from "axios";
import authHeader from "./jwt-token-access/auth-token-header";



//apply base url for axios
const API_URL = "http://localhost:3000/api";

const axiosApi = axios.create({
  baseURL: API_URL,
});

// axiosApi.defaults.headers.common["Authorization"] = token;
export const AxiosInterceptor = () => {
  const updateHeader = (request:AxiosRequestConfig<any>) => {
    // const authUser = JSON.parse(localStorage.getItem("authUser") as string);
    const newHeaders = authHeader();
    request.headers = newHeaders;
    return request;
  };
  axiosApi.interceptors.request.use((request: InternalAxiosRequestConfig <any>) => {
    console.log(request.url)
    if (request.url?.includes ("login") || request.url?.includes('auth') ) return request;
    return updateHeader(request) as InternalAxiosRequestConfig<any>;
  });
};
axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url:string, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function post(url:string, data: Record<string, unknown>, config = {}){
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(url:string, data: Record<string, unknown>, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url:string, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}
