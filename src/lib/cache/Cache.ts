import { z } from 'zod';

interface CacheConfig {
  ttl?: number;
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
  schema?: z.ZodType<T>;
}

export class Cache {
  private static instance: Cache;
  private storage = new Map<string, CacheItem<any>>();
  private subscribers = new Map<string, Set<() => void>>();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutos

  private constructor() {
    if (typeof window !== 'undefined') {
      // Revalidar al recuperar foco
      window.addEventListener('focus', () => this.revalidateAll());
      
      // Revalidar al reconectar
      window.addEventListener('online', () => this.revalidateAll());
    }
  }

  static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  set<T>(key: string, data: T, config?: CacheConfig & { schema?: z.ZodType<T> }): void {
    const { ttl = this.defaultTTL, schema } = config || {};
    
    // Validar datos si hay schema
    if (schema) {
      schema.parse(data);
    }
    
    this.storage.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
      schema
    });
    
    // Notificar subscribers
    this.notify(key);
  }

  private notify(key: string): void {
    const subscribers = this.subscribers.get(key);
    if (subscribers) {
      subscribers.forEach(callback => callback());
    }
  }

  subscribe(key: string, callback: () => void): () => void {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    
    this.subscribers.get(key)!.add(callback);
    
    return () => {
      this.subscribers.get(key)?.delete(callback);
    };
  }

  private async revalidateAll(): Promise<void> {
    // Implementar lógica de revalidación
  }
}

export const cache = Cache.getInstance();