import axios from 'axios';

const axiosApiInstance = axios.create({
    baseURL: "http://localhost:3000",
})

axiosApiInstance.interceptors.request.use(
    async config => {
        config.headers = {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
)

export default axiosApiInstance;