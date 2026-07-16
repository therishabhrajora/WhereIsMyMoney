import axios from "axios";

const BASE_URL = "http://localhost:9090/";

// Create a configured Axios instance
const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout limit
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
    (error) => Promise.reject(error)
);

// Response Interceptor: Centralized global error handling handler block
apiClient.interceptors.response.use(
    (response) => response.data, // Automatically strip the Axios wrapper and return just the data payload
    (error) => {
        const customError = {
            message: error.response?.data?.message || "An unexpected network error occurred.",
            status: error.response?.status || 500,
            originalError: error,
        };
        console.error(`[API Error ${customError.status}]:`, customError.message);
        return Promise.reject(customError);
    }
);

// Structured API Service Methods mapping directly to your backend layer routes
export const AuthService = {
    register: (registerData) => apiClient.post("api/users/register", registerData),
    login: (loginData) => apiClient.post("api/users/login", loginData),
};
export const MessageService = {
    getMessages: () => apiClient.get("api/messages"),
    sendMessage: (messageData) => apiClient.post("api/messages/send", messageData),
    deleteMessage: (id) => apiClient.delete(`api/messages/delete/${id}`),
};

export const RecordService = {
    getRecords: () => apiClient.get("api/records"),
    addRecord: (recordData) => apiClient.post("api/records/add", recordData),
    updateRecord: (id, recordData) => apiClient.put(`api/records/update/${id}`, recordData),
    deleteRecord: (id) => apiClient.delete(`api/records/delete/${id}`),
};

export const AnalyticsService = {
    getDailyExpenses: () => apiClient.get("api/analytics/daily"),
    getMonthlyStatistics: () => apiClient.get("api/analytics/monthly"),
};

export default apiClient;
