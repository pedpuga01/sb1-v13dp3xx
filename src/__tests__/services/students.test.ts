import { describe, it, expect, vi, beforeEach } from 'vitest';
import { studentService } from '../../services/students';
import { supabase } from '../../lib/supabase/client';

vi.mock('../../lib/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(),
      insert: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      eq: vi.fn()
    }))
  }
}));

describe('StudentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get students by academy', async () => {
    const mockStudents = [
      { id: '1', name: 'Student 1' },
      { id: '2', name: 'Student 2' }
    ];

    const mockSelect = vi.fn().mockResolvedValue({
      data: mockStudents,
      error: null
    });

    (supabase.from as any).mockReturnValue({
      select: () => ({
        eq: () => mockSelect()
      })
    });

    const result = await studentService.getByAcademy('academy-1');
    expect(result).toEqual(mockStudents);
  });

  it('should create student', async () => {
    const mockStudent = { id: '1', name: 'New Student' };
    const mockInsert = vi.fn().mockResolvedValue({
      data: mockStudent,
      error: null
    });

    (supabase.from as any).mockReturnValue({
      insert: () => ({
        select: () => ({
          single: mockInsert
        })
      })
    });

    const result = await studentService.create({ name: 'New Student' });
    expect(result).toEqual(mockStudent);
  });

  it('should handle errors', async () => {
    const error = new Error('Database error');
    const mockSelect = vi.fn().mockResolvedValue({
      data: null,
      error
    });

    (supabase.from as any).mockReturnValue({
      select: () => ({
        eq: () => mockSelect()
      })
    });

    await expect(studentService.getByAcademy('academy-1'))
      .rejects.toThrow('Database error');
  });
});