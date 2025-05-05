import axios from "axios";
import {BASE_API_URL} from "../constants";

const api = axios.create({
    baseURL:BASE_API_URL,
    headers:{
        "Content-Type" : "application/json"
    }
})

//adding cookie (if exists) for all the requests that goes out 
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export default api;