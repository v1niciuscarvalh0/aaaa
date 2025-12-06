import axios from "axios";

// Base URL da API
const api = axios.create({
    baseURL: "http://localhost:8080", // troque para sua URL do Spring Boot
});

// Interceptadores (opcional: log ou tratamento de erros)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Erro na requisição:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default api;
