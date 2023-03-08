import Router from "next/router";
import { setLoader, updateData } from "../redux/app.slice";
import { logoutUser } from "../redux/auth.slice";
import store from "../redux/store";
import axiosInstance from "../utils/interceptor";
import jwt from "jsonwebtoken";

export const absoluteUrl = (req, setLocalhost) => {
  var protocol = "https:";
  var host = req ? req.headers["x-forwarded-host"] || req.headers["host"] : window.location.host;
  if (host.indexOf("localhost") > -1) {
    if (setLocalhost) host = setLocalhost;
    protocol = "http:";
  }
  return {
    protocol: protocol,
    host: host,
    origin: protocol + "//" + host,
    url: req,
  };
};

export const logout = () => {
  store.dispatch(logoutUser());
  Router.push("/login");
};

export const formatCurrency = (amount) => {
  return (
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    })
      .format(amount)
      .replace("$", "") + " PKR"
  );
};

export const updateDashboard = async (req) => {
  const {
    data: { responseCode, data },
  } = await axiosInstance.get(`${getBaseURL(req)}/updateDashboardCalls`);
  if (responseCode === "00") store.dispatch(updateData(data));
};

export const getBaseURL = (req) => `${absoluteUrl(req).origin}/api`;

export const getLeaderboardData = (module) => {
  const { teamScores } = store.getState().app;
  const teamIds = Object.keys(module)
    .filter((i) => ["first", "second", "third", "fourth", "fifth"].includes(i))
    .map((i) => module[i]);
  const teams = teamScores
    .filter((i) => teamIds.includes(i.id))
    .map((i) => ({ ...i, name: i.username }));
  return teams;
};

export const camelCaseToNormal = (string) =>
  string.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

export const verifyAuth = (req) => {
  const token = req.headers.authorization;
  if (!token) return false;
  return jwt.verify(token.replace("Bearer ", ""), process.env.JWT_KEY);
};
