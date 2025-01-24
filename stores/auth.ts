import { User } from "@/types"
import { create } from 'zustand'


type Store = {
    user: null | User;
    isLoggedIn: boolean;
    setAuth: (u: User) => void;
    logout: () => void
}

const useAuth = create<Store>((set) => ({
    user: null,
    isLoggedIn: false,
    setAuth: (u: User) => {
        set({ user: u, isLoggedIn: true })
    },
    logout: () => {
        set({ user: null, isLoggedIn: false })
    }
}))

export default useAuth