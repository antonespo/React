import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(success => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  if(success.status === 200) toast("Get or Put successfully submitted")
  if(success.status === 204) toast("Delete successfully submitted")

  return success;
},
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  error => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      console.log("Logging the error", error);
      toast.error("An unexpected error occurrred.");
    }

    return Promise.reject(error);
  });

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
