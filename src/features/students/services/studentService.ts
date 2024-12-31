import { CachedApiService } from '../../../services/base';
import { validateData } from '../../../utils/validation';
import { studentSchema } from '../validation';
import type { Student, StudentFilters } from '../types';

class StudentService extends CachedApiService {
  private static instance: StudentService;
  private readonly CACHE_KEY = 'students';
  
  private constructor() {
    super('students');
  }
  
  static getInstance(): StudentService {
    if (!StudentService.instance) {
      StudentService.instance = new StudentService();
    }
    return StudentService.instance;
  }

  async getByAcademy(academyId: string, filters?: StudentFilters) {
    const cacheKey = `${this.CACHE_KEY}:${academyId}:${JSON.stringify(filters)}`;
    
    return this.getCached(cacheKey, async () => {
      const query = this.query()
        .select('*')
        .eq('academy_id', academyId);
        
      if (filters?.search) {
        query.or(`nombre.ilike.%${filters.search}%,apellido.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
      }
      
      if (filters?.estado) {
        query.eq('estado', filters.estado);
      }
      
      if (filters?.sort) {
        query.order(filters.sort, { ascending: filters.order === 'asc' });
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    });
  }

  async create(student: Omit<Student, 'id'>) {
    const validatedData = validateData(studentSchema, student);
    
    const { data, error } = await this.query()
      .insert(validatedData)
      .select()
      .single();
      
    if (error) throw error;
    
    // Invalidar caché
    this.invalidateCache(`${this.CACHE_KEY}:${student.academy_id}`);
    
    return data;
  }

  async update(id: string, student: Partial<Student>) {
    const { data, error } = await this.query()
      .update(student)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    // Invalidar caché
    this.invalidateCache(`${this.CACHE_KEY}:${student.academy_id}`);
    
    return data;
  }
}

export const studentService = StudentService.getInstance();