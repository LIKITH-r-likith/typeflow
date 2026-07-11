import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Logger
api.interceptors.request.use(
  (config) => {
    console.log("➡️ REQUEST");
    console.log("Method :", config.method?.toUpperCase());
    console.log("URL    :", `${config.baseURL ?? ""}${config.url ?? ""}`);
    console.log("Data   :", config.data);

    return config;
  },
  (error) => {
    console.error("❌ REQUEST ERROR");
    console.error(error);
    return Promise.reject(error);
  }
);

// Response Logger
api.interceptors.response.use(
  (response) => {
    console.log("✅ RESPONSE");
    console.log("Status :", response.status);
    console.log("URL    :", response.config.url);
    console.log("Data   :", response.data);

    return response;
  },
  (error) => {
    console.error("❌ AXIOS ERROR");

    if (error.response) {
      console.error("Status :", error.response.status);
      console.error("Data   :", error.response.data);
    } else if (error.request) {
      console.error("No response received from server.");
    } else {
      console.error(error.message);
    }

    return Promise.reject(error);
  }
);