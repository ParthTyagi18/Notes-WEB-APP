import axios from "axios"

const BaseURL = import.meta.env.PROD ? "/api" : "http://localhost:5001/api"

const axiosApi = axios.create({
    baseURL: BaseURL
})

export default axiosApi