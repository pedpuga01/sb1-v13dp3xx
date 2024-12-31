import { z } from 'zod';
import { AppError } from '../utils/errors';

export interface CacheConfig {
  ttl?: number;
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
  staleWhileRevalidate?: boolean;
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
  schema?: z.ZodType<T>;
  isRevalidating?: boolean;
}

export class CacheManager {
  private static instance: CacheManager;
  private storage = new Map<string, CacheItem<any>>();
  private subscribers = new Map<string, Set<() => void>>();
  private revalidationQueue = new Set<string>();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutos

  private constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', () => this.revalidateAll());
      window.addEventListener('online', () => this.revalidateAll());
    }
  }

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    config?: CacheConfig & { schema?: z.ZodType<T> }
  ): Promise<T> {
    const item = this.storage.get(key);
    const now = Date.now();

    // Si no hay datos en caché o están expirados
    if (!item || now - item.timestamp > item.ttl) {
      return this.fetchAndCache(key, fetcher, config);
    }

    // Si los datos están "stale" pero queremos revalidar en background
    if (config?.staleWhileRevalidate && now - item.timestamp > item.ttl / 2) {
      this.revalidateInBackground(key, fetcher, config);
    }

    return item.data;
  }

  private async fetchAndCache<T>(
    key: string,
    fetcher: () => Promise<T>,
    config?: CacheConfig & { schema?: z.ZodType<T> }
  ): Promise<T> {
    try {
      const data = await fetcher();
      
      // Validar datos si hay schema
      if (config?.schema) {
        config.schema.parse(data);
      }

      this.storage.set(key, {
        data,
        timestamp: Date.now(),
        ttl: config?.ttl || this.defaultTTL,
        schema: config?.schema
      });

      this.notify(key);
      return data;
    } catch (error) {
      throw new AppError(
        'Error fetching data',
        'CACHE_ERROR',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  private async revalidateInBackground<T>(
    key: string,
    fetcher: () => Promise<T>,
    config?: CacheConfig
  ): Promise<void> {
    if (this.revalidationQueue.has(key)) return;
    
    this.revalidationQueue.add(key);
    const item = this.storage.get(key);
    if (item) item.isRevalidating = true;

    try {
      const data = await fetcher();
      this.storage.set(key, {
        data,
        timestamp: Date.now(),
        ttl: config?.ttl || this.defaultTTL,
        schema: item?.schema
      });
      this.notify(key);
    } catch (error) {
      console.error('Background revalidation failed:', error);
    } finally {
      this.revalidationQueue.delete(key);
      const updatedItem = this.storage.get(key);
      if (updatedItem) updatedItem.isRevalidating = false;
    }
  }

  private async revalidateAll(): Promise<void> {
    const revalidationPromises = Array.from(this.storage.entries())
      .filter(([_, item]) => item.isRevalidating !== true)
      .map(async ([key, item]) => {
        if (item.schema) {
          await this.revalidateInBackground(key, () => item.data, { schema: item.schema });
        }
      });

    await Promise.allSettled(revalidationPromises);
  }

  subscribe(key: string, callback: () => void): () => void {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    
    this.subscribers.get(key)!.add(callback);
    return () => {
      this.subscribers.get(key)?.delete(callback);
      if (this.subscribers.get(key)?.size === 0) {
        this.subscribers.delete(key);
      }
    };
  }

  private notify(key: string): void {
    const subscribers = this.subscribers.get(key);
    if (subscribers) {
      subscribers.forEach(callback => callback());
    }
  }

  remove(key: string): void {
    this.storage.delete(key);
    this.subscribers.delete(key);
    this.revalidationQueue.delete(key);
  }

  clear(): void {
    this.storage.clear();
    this.subscribers.clear();
    this.revalidationQueue.clear();
  }
}

export const cacheManager = CacheManager.getInstance();