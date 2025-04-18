import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthStore {
    isAuthenticated: boolean;
    // user: { id: string; email: string; name: string } | null;
    setAuth: (isAuthenticated: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    user: null,
    setAuth: (isAuthenticated) => set({ isAuthenticated }),
    logout: () => {
        Cookies.remove('authorization');
        set({ isAuthenticated: false });
    },
}));
