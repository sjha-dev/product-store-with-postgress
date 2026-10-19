import { create } from "zustand";
import axios from "axios";

const BaseURL = "http://localhost:3030";

export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${BaseURL}/api/products`);
            set({ products: response.data.data, error: null });
        } catch (err) {
            if (err.status === 429) {
                set({ error: "Rate limit exceeded. Please try again later." });
            } else {
                set({ error: err.message || "An error occurred while fetching products." });
            }
        } finally {
            set({ loading: false });
        }
    },

    createProduct: async (product) => {
        try {
            const response = await axios.post(`${BaseURL}/api/products`, product);
            set({ products: [response.data.data, ...get().products], error: null });
            return response.data.data;
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Unable to create product.";
            set({ error: message });
            throw new Error(message, { cause: err });
        }
    },

    fetchProduct: async (id) => {
        try {
            const response = await axios.get(`${BaseURL}/api/products/${id}`);
            return response.data.data;
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Unable to load product.";
            set({ error: message });
            throw new Error(message, { cause: err });
        }
    },

    updateProduct: async (id, product) => {
        try {
            const response = await axios.put(`${BaseURL}/api/products/${id}`, product);
            set({
                products: get().products.map((item) =>
                    item.id === Number(id) ? response.data.data : item
                ),
                error: null,
            });
            return response.data.data;
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Unable to update product.";
            set({ error: message });
            throw new Error(message, { cause: err });
        }
    },

    deleteProduct: async (id) => {
        try {
            await axios.delete(`${BaseURL}/api/products/${id}`);
            set({
                products: get().products.filter((item) => item.id !== Number(id)),
                error: null,
            });
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Unable to delete product.";
            set({ error: message });
            throw new Error(message, { cause: err });
        }
    }
}));
