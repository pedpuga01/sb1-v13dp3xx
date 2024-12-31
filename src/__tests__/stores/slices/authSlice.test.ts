import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAuthSlice } from '../../../stores/slices/authSlice';
import { supabase } from '../../../lib/supabase/client';
import { AuthError } from '../../../utils/errors';

vi.mock('../../../lib/supabase/client', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      resetPasswordForEmail: vi.fn()
    }
  }
}));

describe('AuthSlice', () => {
  let set: any;
  let get: any;
  let authSlice: ReturnType<typeof createAuthSlice>;

  beforeEach(() => {
    set = vi.fn();
    get = vi.fn();
    authSlice = createAuthSlice(set, get);
    vi.clearAllMocks();
  });

  it('should handle successful sign in', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    (supabase.auth.signInWithPassword as any).mockResolvedValue({
      data: { user: mockUser },
      error: null
    });

    await authSlice.signIn('test@example.com', 'password');

    expect(set).toHaveBeenCalledWith({ loading: true, error: null });
    expect(set).toHaveBeenCalledWith({ user: mockUser, loading: false });
  });

  it('should handle sign in error', async () => {
    const error = { message: 'Invalid credentials' };
    (supabase.auth.signInWithPassword as any).mockResolvedValue({
      data: null,
      error
    });

    await expect(authSlice.signIn('test@example.com', 'wrong'))
      .rejects.toThrow(AuthError);

    expect(set).toHaveBeenCalledWith({ 
      error: 'Invalid credentials', 
      loading: false 
    });
  });

  it('should handle successful sign out', async () => {
    (supabase.auth.signOut as any).mockResolvedValue({ error: null });

    await authSlice.signOut();

    expect(set).toHaveBeenCalledWith({ loading: true, error: null });
    expect(set).toHaveBeenCalledWith({ user: null, loading: false });
  });
});