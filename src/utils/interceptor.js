import axios from "axios";
import { setLoader } from "../redux/app.slice";
import store from "../redux/store";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { logoutUser } from "../redux/auth.slice";
import { logout } from ".";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    store.dispatch(setLoader(true));
    const endpoint = config.url.split("/api/")[1];
    if (endpoint != "auth")
      config.headers["Authorization"] = `Bearer ${store.getState().auth.user?.jwt || ""}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    store.dispatch(setLoader(false));
    const {
      data: { responseCode, responseDescription },
    } = response;
    const endpoint = response.config.url.split("/api/")[1];
    if (responseCode === "00") {
      if (endpoint === "auth" || endpoint === "buySell")
        NotificationManager.success(responseDescription, "SUCCESS");
    } else {
      if (responseCode === "401") logout();
      NotificationManager.error(responseDescription, "ERROR");
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
