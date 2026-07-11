import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(
      "➡️ REQUEST:",
      config.method?.toUpperCase(),
      `${config.baseURL}${config.url}`
    );
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log(
      "✅ RESPONSE:",
      response.status,
      response.config.url
    );
    return response;
  },
  (error) => {
    console.error("❌ AXIOS ERROR");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error(error.message);
    }

    return Promise.reject(error);
  }
);