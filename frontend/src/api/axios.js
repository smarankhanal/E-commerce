import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// api.interceptors.response.use(
//   (response) => {
//     return response;
//     console.log(response);
//   },

//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         await api.post("/auth/refresh-token");

//         return api(originalRequest);
//       } catch (refreshError) {
//         window.location.href = "/login";

//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

export default api;

// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// });

// // Add access token to every request
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     console.log(token);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// // Handle expired access token
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },

//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Get a new access token
//         const response = await api.post("/auth/refresh-token");
//         console.log(response);
//         const newAccessToken = response.data?.data?.accessToken;
//         console.log(newAccessToken);
//         // Save new access token
//         localStorage.setItem("token", newAccessToken);

//         // Update the failed request with the new token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         // Retry original request
//         return api(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem("token");

//         window.location.href = "/login";

//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// export default api;
