import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DriveFile } from '@/lib/drive';

interface AppState {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  favorites: string[]; // array of file IDs
  toggleFavorite: (id: string) => void;
  recentFiles: DriveFile[];
  addRecentFile: (file: DriveFile) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      viewMode: 'grid',
      setViewMode: (mode) => set({ viewMode: mode }),
      favorites: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((fId) => fId !== id)
            : [...state.favorites, id],
        })),
      recentFiles: [],
      addRecentFile: (file) =>
        set((state) => {
          // Keep only unique recent files, max 10
          const filtered = state.recentFiles.filter((f) => f.id !== file.id);
          return {
            recentFiles: [file, ...filtered].slice(0, 10),
          };
        }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'drive-browser-storage',
      partialize: (state) => ({
        viewMode: state.viewMode,
        favorites: state.favorites,
        recentFiles: state.recentFiles,
      }),
    }
  )
);
