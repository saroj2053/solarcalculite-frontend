import { create } from "zustand";

const authUserStore = (set) => ({
  authUser: JSON.parse(localStorage.getItem("auth")) || null,
  setAuthUser: (authUser) => set({ authUser }),
});

const useAuthUserStore = create(authUserStore);

export default useAuthUserStore;
