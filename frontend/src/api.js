import axios from "axios";

 const API=axios.create({
    baseURL:"http://localhost:3000/api/auth",
    
});

export  const APIproperty=axios.create({
    baseURL:"http://localhost:3000/api/property",
    
});


export const APIbooking = axios.create({
  baseURL: "http://localhost:3000/api/booking",
});


export default API;


