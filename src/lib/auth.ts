export const TOKEN_KEY = "erp_access_token"
export const USER_KEY = "erp_user"

// ----------------------
// SAVE AUTH
// ----------------------

export const saveAuth = (
  token: string,
  user: any
) => {
  localStorage.setItem(
    TOKEN_KEY,
    token
  )

  /**
   * IMPORTANT:
   * ensure refresh_token is never lost
   */
  const existingUser =
    getUser() || {}

  const mergedUser = {
    ...existingUser,
    ...user
  }

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(mergedUser)
  )
}

// ----------------------
// UPDATE ACCESS TOKEN ONLY (NEW)
// ----------------------

export const updateAccessToken = (
  token: string
) => {
  localStorage.setItem(
    TOKEN_KEY,
    token
  )
}

// ----------------------
// GET TOKEN
// ----------------------
export function getAuth() {

  if (typeof window === "undefined") return null;

  const auth = localStorage.getItem("auth");

  return auth ? JSON.parse(auth) : null;

}
export const getToken = () => {
  if (typeof window === "undefined") {
    return null
  }

  return localStorage.getItem(TOKEN_KEY)
}

// ----------------------
// GET USER
// ----------------------

export const getUser = () => {
  if (typeof window === "undefined") {
    return null
  }

  const user = localStorage.getItem(USER_KEY)

  return user ? JSON.parse(user) : null
}

// ----------------------
// GET REFRESH TOKEN (NEW - SAFE ACCESS)
// ----------------------

export const getRefreshToken = () => {
  const user = getUser()
  return user?.refresh_token || null
}

// ----------------------
// LOGOUT
// ----------------------

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)

  window.location.href = "/login"
}