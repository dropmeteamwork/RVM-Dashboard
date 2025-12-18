import axios from "axios";

const api = axios.create({
  baseURL: "https://dropme.up.railway.app/dashboard/v2/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        window.location.href = "/"; 
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          "https://web-testing-3a06.up.railway.app/dashboard/v2/auth/refresh/",
          { refresh: refreshToken }
        );

        const newAccess = res.data.access;
        localStorage.setItem("access_token", newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ============================================
// OVERVIEW PAGE ENDPOINTS
// ============================================

export const getOverviewMetrics = (months = 12) => {
  return api.get(`metrics/overview/?months=${months}`);
};

// ============================================
// ANALYTICS PAGE ENDPOINTS
// ============================================

export const getUserAnalytics = () => {
  return api.get("analytics/user-data/");
};

export const getTransactionAnalytics = () => {
  return api.get("analytics/transactions/");
};

export const getAnalyticsData = (months = 12) => {
  return api.get(`analytics/analytics-data/?months=${months}`);
};

// ============================================
// MACHINE PAGE ENDPOINTS
// ============================================

export const getMachineMetrics = () => {
  return api.get("metrics/machines/");
};

// ============================================
// ENVIRONMENT PAGE ENDPOINTS
// ============================================

export const getEnvironmentalMetrics = (months = 6) => {
  return api.get(`metrics/environmental/?months=${months}`);
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Fetch all dashboard data for the overview page
 */
export const fetchOverviewData = async (months = 12) => {
  try {
    const response = await getOverviewMetrics(months);
    return response.data;
  } catch (error) {
    console.error("Error fetching overview data:", error);
    throw error;
  }
};

/**
 * Fetch all analytics data including user data and transactions
 */
export const fetchAnalyticsData = async (months = 12) => {
  try {
    const [userData, transactions, analyticsData] = await Promise.all([
      getUserAnalytics(),
      getTransactionAnalytics(),
      getAnalyticsData(months),
    ]);
    
    return {
      userData: userData.data,
      transactions: transactions.data,
      analytics: analyticsData.data,
    };
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw error;
  }
};

/**
 * Fetch machine metrics data
 */
export const fetchMachineData = async () => {
  try {
    const response = await getMachineMetrics();
    return response.data;
  } catch (error) {
    console.error("Error fetching machine data:", error);
    throw error;
  }
};

/**
 * Fetch environmental metrics data
 */
export const fetchEnvironmentalData = async (months = 6) => {
  try {
    const response = await getEnvironmentalMetrics(months);
    return response.data;
  } catch (error) {
    console.error("Error fetching environmental data:", error);
    throw error;
  }
};

export default api;
