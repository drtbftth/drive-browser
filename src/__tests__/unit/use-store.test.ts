import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '@/store/use-store';

describe('useStore', () => {
  beforeEach(() => {
    useStore.setState({
      viewMode: 'grid',
      favorites: [],
      recentFiles: [],
      searchQuery: '',
    });
  });

  it('should toggle view mode', () => {
    const { setViewMode } = useStore.getState();
    setViewMode('list');
    expect(useStore.getState().viewMode).toBe('list');
  });

  it('should toggle favorites', () => {
    const { toggleFavorite } = useStore.getState();
    toggleFavorite('file1');
    expect(useStore.getState().favorites).toContain('file1');
    
    toggleFavorite('file1');
    expect(useStore.getState().favorites).not.toContain('file1');
  });

  it('should add recent files and keep max 10', () => {
    const { addRecentFile } = useStore.getState();
    
    for (let i = 0; i < 15; i++) {
      addRecentFile({
        id: `file${i}`,
        name: `File ${i}`,
        mimeType: 'text/plain',
      });
    }

    const state = useStore.getState();
    expect(state.recentFiles.length).toBe(10);
    expect(state.recentFiles[0].id).toBe('file14'); // Most recent first
  });

  it('should set search query', () => {
    const { setSearchQuery } = useStore.getState();
    setSearchQuery('test');
    expect(useStore.getState().searchQuery).toBe('test');
  });
});
