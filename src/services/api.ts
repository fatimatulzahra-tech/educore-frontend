import axios from "axios"

import {
  getToken,
  getUser,
  saveAuth,
  logout
} from "@/lib/auth"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// -----------------------
// REQUEST INTERCEPTOR
// -----------------------

api.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// -----------------------
// RESPONSE INTERCEPTOR (REFRESH LOGIC)
// -----------------------

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config

    // Only handle 401 errors
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const user = getUser()

        const refreshToken =
          user?.refresh_token

        // If no refresh token → force logout
        if (!refreshToken) {
          logout()
          return Promise.reject(error)
        }

        // Call refresh endpoint
        const res = await axios.post(
          "http://127.0.0.1:8000/auth/refresh",
          {
            refresh_token: refreshToken
          }
        )

        const newAccessToken =
          res.data.access_token

        // Update ONLY access token (safe)
        saveAuth(newAccessToken, user)

        // Update header for retry
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`

        // Retry original request
        return api(originalRequest)

      } catch (refreshError) {
        logout()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api