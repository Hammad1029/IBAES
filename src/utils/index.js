import Router from 'next/router';
import { logoutUser } from "../redux/auth.slice";
import store from "../redux/store";

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
    }).format(amount).replace("$", "PKR ")
}