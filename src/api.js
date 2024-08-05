// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.39.201.42:8090', // API의 기본 URL
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    console.log('Request:', config); // Log the request details
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      try {
        const response = await axios.post('http://3.39.201.42:8090/api/token/refresh/', {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        localStorage.setItem('access_token', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
        // 리프레시 토큰이 실패한 경우, 로그아웃 처리 등을 할 수 있음
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;