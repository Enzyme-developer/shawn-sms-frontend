import { apiClient, apiFormClient } from "./client";


/* eslint-disable import/no-anonymous-default-export */
export const registerUser = (data) => {
  return apiClient.put("/register", data);
};

export const signIn = (data) => {
  return apiClient.post("/login", data);
};

export const login_2fa = (data) => {
  return apiClient.post("/login_2fa", data);
};

export const forgotPassword = (data) => {
  return apiClient.post("/password/reset", data);
};

export const verifyAccount = (data) => {
  return apiClient.post("/email/resend", data);
};

export const resetPassword = (data) => {
  return apiClient.post("/change_password", data);
};

export const logOut = () => {
  return apiClient.post("/reset", null);
};

export const getUser = () => {
  return apiClient.get("/account");
};

export const updatePassword = (data) => {
  return apiClient.post("/auth/password-reset", data);
};

export const updateAccount = (data) => {
  return apiClient.post("/account", data);
};

export const uploadAvatar = (data) => {
  return apiFormClient.post("/account/avatar", data);
};
