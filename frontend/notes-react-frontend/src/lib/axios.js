import axios from "axios"

const BaseURL = import.meta.env.NODE_ENV === "production" ? "/api" : "http://localhost:5001/api"

const axiosApi = axios.create({
    baseURL: BaseURL
})

export default axiosApi