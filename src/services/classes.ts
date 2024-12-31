import { ApiService, QueryBuilder } from './api';
import type { Class } from '../types/models';

class ClassService extends QueryBuilder<'classes'> {
  constructor() {
    super('classes');
  }

  async getByAcademy(academyId: string) {
    try {
      const { data, error } = await this.query()
        .select('*')
        .eq('academy_id', academyId);
        
      if (error) throw error;
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getByTeacher(teacherId: string) {
    try {
      const { data, error } = await this.query()
        .select('*')
        .eq('teacher_id', teacherId);
        
      if (error) throw error;
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async create(classData: Omit<Class, 'id'>) {
    try {
      const { data, error } = await this.query()
        .insert(classData)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, classData: Partial<Class>) {
    try {
      const { data, error } = await this.query()
        .update(classData)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export const classService = new ClassService();