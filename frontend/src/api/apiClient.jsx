import axios from "axios";
import { toast } from 'react-toastify';

// const BASE_URL = "http://localhost:9090/";
const BASE_URL = "https://whereismymoney-87yj.onrender.com/";

// Create a configured Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor: Inject auth tokens or log requests here if needed
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Centralized global error handling handler block
apiClient.interceptors.response.use(
  (response) => response, // Automatically strip the Axios wrapper and return just the data payload
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem("token");
        localStorage.clear();
        toast.error("Session expired. Please log in again.");
        window.location.href - "/login";
      } else if (status === 500) {
        toast.error("Internal server error. Please try again later.");
        // alert("internal server error");

      } else if (status === 429 || (error.message && error.message.includes("429"))) {
        toast.warning("Your request quota has expired for today. 🛑");
      } else {
        toast.error(error.response.data?.message || "An error occurred.");
      }
    } else if (error.request) {
      toast.error("Network Error: No response received from server. Check your connection.");
    } else {
      toast.error("Configuration error. Failed to send request.");
      console.log(error.message);
    }
    return Promise.reject(error);
  },
);

export const AuthService = {
  register: (registerData) =>
  apiClient.post("api/users/register", registerData),
  login: (loginData) => apiClient.post("api/users/login", loginData),
  forgotPassword: (payload) => apiClient.post("api/users/forgot-password", payload),
  resetPassword: (payload) => apiClient.post("api/users/reset-password", payload),
};

export const MessageService = {
  getMessages: () => apiClient.get("api/messages"),
  sendMessage: (messageData) =>
    apiClient.post("api/messages/send", messageData),
  deleteMessage: (id) => apiClient.delete(`api/messages/delete/${id}`),
};

export const RecordService = {
  getRecords: () => apiClient.get("api/records"),
  addRecord: (recordData) => apiClient.post("api/records/add", recordData),
  updateRecord: (id, recordData) =>
    apiClient.put(`api/records/update/${id}`, recordData),
  deleteRecord: (id) => apiClient.delete(`api/records/delete/${id}`),
};

export const AnalyticsService = {
  getDailyExpenses: () => apiClient.get("api/analytics/daily"),
  getMonthlyStatistics: () => apiClient.get("api/analytics/monthly"),
};

export const UserMessageService = {
  addUserMessages: (input) => apiClient.post("api/user-message/add", input),
};

export const GeminiService = {
  chat: (input) => apiClient.post("api/ai/chat", input),
  analyze: (id) => apiClient.get(`api/ai/analyze/${id}`),
  getChatResponse: (chatRequest) => apiClient.post(`api/chat/send`, chatRequest)
}

export const ExchangeRates = {
  rates: (base) => apiClient.get(`api/currency/rates/${base}`)
}




export default apiClient;
