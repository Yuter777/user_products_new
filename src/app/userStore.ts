import axios from "axios";
import { create } from "zustand";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
}

interface UserStore {
  loading: boolean;
  users: User[];
  error: string;
  fetchUsers: () => Promise<void>;
  addUser: (user: User) => Promise<void>;
  editUser: (user: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  searchUsers: (query: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  loading: false,
  users: [],
  error: "",
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("http://localhost:3000/users");
      set({ users: res.data, loading: false, error: "" });
    } catch (err) {
      set({ users: [], loading: false, error: (err as Error).message });
    }
  },
  addUser: async (user: User) => {
    set({ loading: true });
    try {
      await axios.post("http://localhost:3000/users", user);
      set((state) => ({
        users: [...state.users, user],
        loading: false,
        error: "",
      }));
    } catch (err) {
      set({ loading: false, error: (err as Error).message });
    }
  },
  editUser: async (user: User) => {
    set({ loading: true });
    try {
      await axios.put(`http://localhost:3000/users/${user.id}`, user);
      set((state) => ({
        users: state.users.map((u) => (u.id === user.id ? user : u)),
        loading: false,
        error: "",
      }));
    } catch (err) {
      set({ loading: false, error: (err as Error).message });
    }
  },
  deleteUser: async (id: string) => {
    set({ loading: true });
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        loading: false,
        error: "",
      }));
    } catch (err) {
      set({ loading: false, error: (err as Error).message });
    }
  },
  searchUsers: (query: string) => {
    set((state) => ({
      users: state.users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(query.toLowerCase()) ||
          user.lastName.toLowerCase().includes(query.toLowerCase())
      ),
    }));
  },
}));
