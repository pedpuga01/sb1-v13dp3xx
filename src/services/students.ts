import { ApiService, QueryBuilder } from './api';
import type { Student } from '../types/models';

class StudentService extends QueryBuilder<'students'> {
  constructor() {
    super('students');
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

  async create(student: Omit<Student, 'id'>) {
    try {
      const { data, error } = await this.query()
        .insert(student)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, student: Partial<Student>) {
    try {
      const { data, error } = await this.query()
        .update(student)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id: string) {
    try {
      const { error } = await this.query()
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export const studentService = new StudentService();