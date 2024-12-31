import { supabase } from '../../../lib/supabase/client';
import { handleError } from '../utils/errors';
import type { BaseModel } from '../types';

export abstract class BaseService<T extends BaseModel> {
  constructor(protected readonly tableName: string) {}

  protected get query() {
    return supabase.from(this.tableName);
  }

  async findById(id: string): Promise<T> {
    try {
      const { data, error } = await this.query
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as T;
    } catch (error) {
      throw handleError(error);
    }
  }

  async findAll(filters?: Record<string, any>): Promise<T[]> {
    try {
      let query = this.query.select('*');

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as T[];
    } catch (error) {
      throw handleError(error);
    }
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    try {
      const { data: created, error } = await this.query
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return created as T;
    } catch (error) {
      throw handleError(error);
    }
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    try {
      const { data: updated, error } = await this.query
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return updated as T;
    } catch (error) {
      throw handleError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const { error } = await this.query.delete().eq('id', id);
      if (error) throw error;
    } catch (error) {
      throw handleError(error);
    }
  }
}