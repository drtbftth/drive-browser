import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchBar } from '@/components/shared/search-bar';
import { useStore } from '@/store/use-store';

describe('SearchBar Integration', () => {
  beforeEach(() => {
    useStore.setState({
      searchQuery: '',
      viewMode: 'grid',
    });
  });

  it('should render and update search query', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Search files...');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'report' } });
    
    expect(useStore.getState().searchQuery).toBe('report');
  });

  it('should toggle view mode', () => {
    render(<SearchBar />);
    
    const listBtn = screen.getByRole('button', { name: /list view/i });
    fireEvent.click(listBtn);
    
    expect(useStore.getState().viewMode).toBe('list');
    
    const gridBtn = screen.getByRole('button', { name: /grid view/i });
    fireEvent.click(gridBtn);
    
    expect(useStore.getState().viewMode).toBe('grid');
  });
});
