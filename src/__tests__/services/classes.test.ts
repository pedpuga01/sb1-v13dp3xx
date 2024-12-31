import { describe, it, expect, vi, beforeEach } from 'vitest';
import { classService } from '../../services/classes';
import { supabase } from '../../lib/supabase/client';

vi.mock('../../lib/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(),
      insert: vi.fn(),
      update: vi.fn(),
      eq: vi.fn()
    }))
  }
}));

describe('ClassService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get classes by academy', async () => {
    const mockClasses = [
      { id: '1', name: 'Class 1' },
      { id: '2', name: 'Class 2' }
    ];

    const mockSelect = vi.fn().mockResolvedValue({
      data: mockClasses,
      error: null
    });

    (supabase.from as any).mockReturnValue({
      select: () => ({
        eq: () => mockSelect()
      })
    });

    const result = await classService.getByAcademy('academy-1');
    expect(result).toEqual(mockClasses);
  });

  it('should get classes by teacher', async () => {
    const mockClasses = [
      { id: '1', name: 'Class 1' }
    ];

    const mockSelect = vi.fn().mockResolvedValue({
      data: mockClasses,
      error: null
    });

    (supabase.from as any).mockReturnValue({
      select: () => ({
        eq: () => mockSelect()
      })
    });

    const result = await classService.getByTeacher('teacher-1');
    expect(result).toEqual(mockClasses);
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

    await expect(classService.getByAcademy('academy-1'))
      .rejects.toThrow('Database error');
  });
});