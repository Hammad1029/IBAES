import axios from 'axios';
import Router from 'next/router';
import { updateData } from '../redux/app.slice';
import { logoutUser } from "../redux/auth.slice";
import store from "../redux/store";
// import * as sheets from "./sheets";

export const absoluteUrl = (req, setLocalhost) => {
    var protocol = 'https:';
    var host = req
        ? req.headers['x-forwarded-host'] || req.headers['host']
        : window.location.host;
    if (host.indexOf('localhost') > -1) {
        if (setLocalhost) host = setLocalhost;
        protocol = 'http:';
    }
    return {
        protocol: protocol,
        host: host,
        origin: protocol + '//' + host,
        url: req,
    };
}

export const logout = () => {
    store.dispatch(logoutUser());
    Router.push("/login");
}

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount).replace("$", "") + " PKR"
}

export const updateDashboard = async (req) => {
    const { data: { responseCode, data: { modules, teamScores } } } = await axios.get(`${getBaseURL(req)}/updateDashboardCalls`);
    if (responseCode === "00") store.dispatch(updateData({ modules, teamScores }))
}

export const getBaseURL = (req) => `${absoluteUrl(req).origin}/api`;

export const getLeaderboardData = (module) => {
    const { teamScores, modules } = store.getState().app;
    const teamIds = Object.keys(module).filter(i => ["first", "second", "third", "fourth", "fifth"].includes(i)).map(i => module[i]);
    const teams = teamScores.filter(i => teamIds.includes(i.id)).map(i => ({ ...i, name: i.username }));
    return teams;
}