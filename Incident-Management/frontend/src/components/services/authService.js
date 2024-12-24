import axios from "axios";
import { FORGOT_PASSWORD_URL, LOGIN_URL, SIGN_UP_URL } from "../utils/constants";


export const signup = async (userData) => {
  try {
    const response = await axios.post(`${SIGN_UP_URL}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred during signup.";
  }
};


export const signin = async (email, password) => {
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Login failed! Please check your credentials.");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || "Something went wrong!");
    }
  };


  export const forgotPassword = async (email) => {
    try {
      const response = await axios.post(`${FORGOT_PASSWORD_URL}`, { email });
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || 'An error occurred while resetting the password');
    }
  };



