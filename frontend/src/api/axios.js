// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// });

// // Separate instance with NO interceptors — used only for refresh/logout calls
// const authApi = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// });

// let isRefreshing = false;
// let queue = []; // requests waiting on the refresh to finish

// const processQueue = (error) => {
//   queue.forEach(({ resolve, reject }) => {
//     if (error) reject(error);
//     else resolve();
//   });
//   queue = [];
// };

// const handleLogout = async () => {
//   try {
//     await authApi.post("/auth/logout");
//   } catch (err) {
//     console.error("Logout request failed:", err);
//   } finally {
//     if (window.location.pathname !== "/login") {
//       window.location.href = "/login";
//     }
//   }
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           queue.push({ resolve, reject });
//         })
//           .then(() => api(originalRequest))
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         await authApi.post("/auth/refresh");
//         processQueue(null);
//         return api(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError);
//         await handleLogout();
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// export default api;

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const authApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const refreshAccessToken = async () => {
  const response = await authApi.post("/auth/refresh");
  return response.data;
};

let isRefreshing = false;
let queue = [];

const processQueue = (error) => {
  queue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });

  queue = [];
};

const handleLogout = async () => {
  try {
    await authApi.post("/auth/logout");
  } catch (err) {
    console.error("Logout request failed:", err);
  } finally {
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshAccessToken();

        processQueue(null);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        await handleLogout();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
