import http from "./config";

const productsApi = {
  create: (data) => http.post("/product", data),
  update: (id, data) => http.put(`/product/${id}`, data),
  get: () => http.get("/products", { params: { page: 1, limit: 10 } }),
  delete: (id) => http.delete(`/product/${id}`),
  getProduct: (id) => http.get(`/product/${id}`),
};

export const getProduct = productsApi.getProduct; // Экспортируем функцию getProduct отдельно
export default productsApi;
