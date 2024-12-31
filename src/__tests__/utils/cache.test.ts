import { describe, it, expect, beforeEach, vi } from 'vitest';
import { cache } from '../../utils/cache';

describe('Cache', () => {
  beforeEach(() => {
    cache.clear();
    vi.useFakeTimers();
  });

  it('should store and retrieve data', () => {
    const data = { id: 1, name: 'Test' };
    cache.set('test', data);
    expect(cache.get('test')).toEqual(data);
  });

  it('should return null for non-existent keys', () => {
    expect(cache.get('non-existent')).toBeNull();
  });

  it('should expire items after TTL', () => {
    const data = { id: 1 };
    cache.set('test', data, 1000); // 1 segundo TTL
    
    expect(cache.get('test')).toEqual(data);
    
    vi.advanceTimersByTime(1500);
    expect(cache.get('test')).toBeNull();
  });

  it('should remove items', () => {
    cache.set('test', { id: 1 });
    cache.remove('test');
    expect(cache.get('test')).toBeNull();
  });

  it('should clear all items', () => {
    cache.set('test1', { id: 1 });
    cache.set('test2', { id: 2 });
    cache.clear();
    
    expect(cache.get('test1')).toBeNull();
    expect(cache.get('test2')).toBeNull();
  });
});