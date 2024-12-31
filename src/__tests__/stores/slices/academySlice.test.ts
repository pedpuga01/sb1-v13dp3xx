import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAcademySlice } from '../../../stores/slices/academySlice';
import { supabase } from '../../../lib/supabase/client';
import { AppError } from '../../../utils/errors';

vi.mock('../../../lib/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(),
      update: vi.fn(),
      eq: vi.fn()
    }))
  }
}));

describe('AcademySlice', () => {
  let set: any;
  let get: any;
  let academySlice: ReturnType<typeof createAcademySlice>;

  beforeEach(() => {
    set = vi.fn();
    get = vi.fn();
    academySlice = createAcademySlice(set, get);
    vi.clearAllMocks();
  });

  it('should fetch academy successfully', async () => {
    const mockAcademy = { id: '1', name: 'Test Academy' };
    const mockSelect = vi.fn().mockResolvedValue({
      data: mockAcademy,
      error: null
    });

    (supabase.from as any).mockReturnValue({
      select: () => ({
        eq: () => ({
          single: mockSelect
        })
      })
    });

    await academySlice.fetchAcademy('1');

    expect(set).toHaveBeenCalledWith({ loading: true, error: null });
    expect(set).toHaveBeenCalledWith({ 
      currentAcademy: mockAcademy, 
      loading: false 
    });
  });

  it('should handle fetch error', async () => {
    const error = { message: 'Not found' };
    const mockSelect = vi.fn().mockResolvedValue({
      data: null,
      error
    });

    (supabase.from as any).mockReturnValue({
      select: () => ({
        eq: () => ({
          single: mockSelect
        })
      })
    });

    await expect(academySlice.fetchAcademy('1'))
      .rejects.toThrow(AppError);

    expect(set).toHaveBeenCalledWith({ 
      error: 'Not found', 
      loading: false 
    });
  });
});