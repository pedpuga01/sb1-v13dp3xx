import { supabase } from '../lib/supabase/client';
import type { Database } from '../types/supabase';

export type Tables = Database['public']['Tables'];

export class ApiService {
  protected supabase = supabase;
  
  protected handleError(error: any): never {
    console.error('API Error:', error);
    throw new Error(error.message || 'Error en la operación');
  }
}

export class QueryBuilder<T extends keyof Tables> extends ApiService {
  constructor(private table: T) {
    super();
  }

  protected query() {
    return this.supabase.from(this.table);
  }
}