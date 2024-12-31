import { useState, useCallback } from 'react';
import { handleError, AppError } from '../utils/errors';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: AppError | null;
}

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (promise: Promise<T>) => {
    setState({ data: null, loading: true, error: null });
    
    try {
      const data = await promise;
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const appError = handleError(error);
      setState({ data: null, loading: false, error: appError });
      throw appError;
    }
  }, []);

  return { ...state, execute };
}