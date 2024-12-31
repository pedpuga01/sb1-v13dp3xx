export interface BaseModel {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
}

export interface QueryParams {
  pagination?: PaginationParams;
  sort?: SortParams;
  filters?: Record<string, any>;
}