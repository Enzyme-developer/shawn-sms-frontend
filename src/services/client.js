import { create } from "apisauce";

const token = localStorage.getItem("token");

export const apiClient = create({
  baseURL: "https://api.shawnsms.com/api/v1/user",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
});

apiClient.addAsyncRequestTransform(async (request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
});

export const apiFormClient = create({
  baseURL: "https://api.shawnsms.com/api/v1/user",
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});

export const apiEventStream = create({
  baseURL: "https://api.shawnsms.com/api/v1/user",
  headers: {
    Accept: "text/event-stream",
    Connection: "keep-alive",
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});

// apiFormClient.addAsyncRequestTransform(async (request) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     request.headers["Authorization"] = `Bearer ${token}`;
//   }
// });

