import axios from 'axios';
import { toast } from 'react-toastify';
const BASE_URL = 'https://zamper-server.onrender.com';
axios.defaults.withCredentials = true;

const requestConfig = () => {
  const token = sessionStorage.getItem('token');
  return {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
};

export const GetDataFunc = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`, requestConfig());

    return response;
  } catch (err) {
    console.error(err);
  }
};

export const PostDataFunc = async (url, payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/${url}`, payload, requestConfig()); //requestConfig

    return response;
  } catch (err) {
    console.error(err);
    // const message = respo
    toast.error(err.response.data.message, {
      autoClose: true,
      position: 'bottom-right'
    });
  }
};

export const UpdateDataFuncParams = async (url) => {
  try {
    const response = await axios.put(`${BASE_URL}/${url}`, requestConfig());
    return response;
  } catch (err) {
    console.log(err);
  }
};
