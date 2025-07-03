import { create } from 'zustand'

// --- State ---
type State = {
  isLoggedIn: boolean;
  user: null | { id: string; name: string; email: string };
}

// --- Actions ---
type Actions = {
  login: (user: { id: string; name: string; email: string }) => void;
  logout: () => void;
}

type LoginStore = State & Actions

const useLoginStore = create<LoginStore>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null }),
}))

export default useLoginStore
