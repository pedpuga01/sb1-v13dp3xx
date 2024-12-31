import { useCallback, useEffect, useState } from 'react';
import { cacheManager, CacheConfig } from '../lib/cache/CacheManager';
import { useAsync } from './useAsync';
import type { z } from 'zod';

interface UseCacheOptions<T> extends CacheConfig {
  schema?: z.ZodType<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: UseCacheOptions<T> = {}
) {
  const { execute } = useAsync<T>();
  const [data, setData] = useState<T | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const fetchData = useCallback(async (shouldRevalidate = false) => {
    try {
      setIsValidating(true);
      const result = await cacheManager.get(key, () => execute(fetcher()), {
        ...options,
        staleWhileRevalidate: shouldRevalidate
      });
      setData(result);
      options.onSuccess?.(result);
      return result;
    } catch (error) {
      options.onError?.(error instanceof Error ? error : new Error('Unknown error'));
      throw error;
    } finally {
      setIsValidating(false);
    }
  }, [key, fetcher, options, execute]);

  useEffect(() => {
    fetchData();

    const unsubscribe = cacheManager.subscribe(key, () => {
      fetchData(true);
    });

    return () => {
      unsubscribe();
    };
  }, [key, fetchData]);

  const mutate = useCallback(async () => {
    return fetchData(true);
  }, [fetchData]);

  return {
    data,
    isValidating,
    mutate
  };
}