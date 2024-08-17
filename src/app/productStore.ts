import axios from "axios";
import { create } from "zustand";

interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  comments: string;
  images: string[];
}

interface ProductStore {
  loading: boolean;
  products: Product[];
  filteredProducts: Product[];
  error: string;
  fetchProducts: () => Promise<void>;
  addProduct: (newProduct: Omit<Product, "id">) => Promise<void>;
  updateProduct: (
    id: string,
    updatedProduct: Partial<Product>
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  searchProducts: (query: string) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  loading: false,
  products: [],
  filteredProducts: [],
  error: "",

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("http://localhost:3000/products");
      set({
        loading: false,
        products: res.data,
        filteredProducts: res.data,
        error: "",
      });
    } catch (err) {
      set({
        loading: false,
        products: [],
        filteredProducts: [],
        error: (err as Error).message,
      });
    }
  },

  addProduct: async (newProduct) => {
    set({ loading: true });
    try {
      const res = await axios.post("http://localhost:3000/products", {
        ...newProduct,
        id: Math.random().toString(36).substr(2, 9),
      });
      set((state) => ({
        loading: false,
        products: [...state.products, res.data],
        filteredProducts: [...state.filteredProducts, res.data],
        error: "",
      }));
    } catch (err) {
      set({
        loading: false,
        error: (err as Error).message,
      });
    }
  },

  updateProduct: async (id, updatedProduct) => {
    set({ loading: true });
    try {
      const res = await axios.patch(
        `http://localhost:3000/products/${id}`,
        updatedProduct
      );
      set((state) => ({
        loading: false,
        products: state.products.map((product) =>
          product.id === id ? res.data : product
        ),
        filteredProducts: state.filteredProducts.map((product) =>
          product.id === id ? res.data : product
        ),
        error: "",
      }));
    } catch (err) {
      set({
        loading: false,
        error: (err as Error).message,
      });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      set((state) => ({
        loading: false,
        products: state.products.filter((product) => product.id !== id),
        filteredProducts: state.filteredProducts.filter(
          (product) => product.id !== id
        ),
        error: "",
      }));
    } catch (err) {
      set({
        loading: false,
        error: (err as Error).message,
      });
    }
  },

  searchProducts: (query) => {
    const lowercasedQuery = query.toLowerCase();
    set((state) => ({
      filteredProducts: state.products.filter(
        (product) =>
          product.title.toLowerCase().includes(lowercasedQuery) ||
          product.brand.toLowerCase().includes(lowercasedQuery) ||
          product.category.toLowerCase().includes(lowercasedQuery)
      ),
    }));
  },
}));
