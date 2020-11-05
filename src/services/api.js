import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:53116/api/",
});

api.defaults.headers.get['Content-Type'] = 'application/json';

api.interceptors.request.use(async config => {
  try {
    const token = localStorage.getItem('@App:token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (Exception) {}
});


export default api;