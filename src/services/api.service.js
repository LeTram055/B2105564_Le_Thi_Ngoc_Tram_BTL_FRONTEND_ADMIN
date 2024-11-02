import axios from "axios";

const commonConfig = {
    withCredentials: true,
    headers: {
        
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

export default (baseURL) => {
    return axios.create({
        baseURL,
        ...commonConfig,
    });
};