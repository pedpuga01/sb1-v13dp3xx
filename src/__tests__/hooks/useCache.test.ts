import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { useCache } from '../../hooks/useCache';
import { cache } from '../../utils/cache';

describe('useCache', () => {
  beforeEach(() => {
    cache.clear();
    vi.useFakeTimers();
  });

  it('should fetch and cache data', async () => {
    const mockData = { id: 1, name: 'Test' };
    const mockFetcher = vi.fn().mockResolvedValue(mockData);
    
    const { result } = renderHook(() => useCache());
    
    // Primera llamada - debería ejecutar el fetcher
    const data1 = await result.current.fetchWithCache('test', mockFetcher);
    expect(data1).toEqual(mockData);
    expect(mockFetcher).toHaveBeenCalledTimes(1);
    
    // Segunda llamada - debería usar caché
    const data2 = await result.current.fetchWithCache('test', mockFetcher);
    expect(data2).toEqual(mockData);
    expect(mockFetcher).toHaveBeenCalledTimes(1);
  });

  it('should revalidate cache when requested', async () => {
    const mockData1 = { id: 1, name: 'Test 1' };
    const mockData2 = { id: 1, name: 'Test 2' };
    const mockFetcher = vi.fn()
      .mockResolvedValueOnce(mockData1)
      .mockResolvedValueOnce(mockData2);
    
    const { result } = renderHook(() => useCache());
    
    // Primera llamada
    const data1 = await result.current.fetchWithCache('test', mockFetcher);
    expect(data1).toEqual(mockData1);
    
    // Segunda llamada con revalidación
    const data2 = await result.current.fetchWithCache('test', mockFetcher, { revalidate: true });
    expect(data2).toEqual(mockData2);
    expect(mockFetcher).toHaveBeenCalledTimes(2);
  });

  it('should invalidate cache', async () => {
    const mockData = { id: 1 };
    const mockFetcher = vi.fn().mockResolvedValue(mockData);
    
    const { result } = renderHook(() => useCache());
    
    await result.current.fetchWithCache('test', mockFetcher);
    result.current.invalidateCache('test');
    
    await result.current.fetchWithCache('test', mockFetcher);
    expect(mockFetcher).toHaveBeenCalledTimes(2);
  });
});