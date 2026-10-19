import { create } from "zustand";
import axios from "axios";

const BaseURL = "http://localhost:3030";

export const useNotificationStore = create((set) => ({
    notifications: [],
    loading: false,
    error: null,

    fetchNotifications: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${BaseURL}/api/notifications`);
            set({ notifications: response.data.data, error: null });
        } catch (err) {
            set({ error: err.response?.data?.message || err.message || "Unable to load notifications." });
        } finally {
            set({ loading: false });
        }
    },
}));
