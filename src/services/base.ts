import { ApiService } from './api';
import { cache } from '../utils/cache';

export abstract class CachedApiService extends ApiService {
  protected async getCached<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    const cachedData = cache.get<T>(key);
    if (cachedData) return cachedData;

    const data = await fetcher();
    cache.set(key, data, ttl);
    return data;
  }

  protected invalidateCache(key: string): void {
    cache.remove(key);
  }
}