import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from '../../hooks/useAuth';
import { useStore } from '../../stores/store';

vi.mock('../../stores/store', () => ({
  useStore: vi.fn()
}));

describe('useAuth', () => {
  const mockStore = {
    user: null,
    loading: false,
    error: null,
    signIn: vi.fn(),
    signOut: vi.fn(),
    resetPassword: vi.fn(),
    fetchAcademy: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useStore as jest.Mock).mockReturnValue(mockStore);
  });

  it('should handle login for regular users', async () => {
    const { result } = renderHook(() => useAuth());
    const credentials = { email: 'test@example.com', password: 'password' };

    await act(async () => {
      await result.current.login(credentials.email, credentials.password);
    });

    expect(mockStore.signIn).toHaveBeenCalledWith(credentials.email, credentials.password);
    expect(mockStore.fetchAcademy).not.toHaveBeenCalled();
  });

  it('should handle login for academy users', async () => {
    const academyUser = {
      id: '1',
      role: 'admin',
      academy_id: 'academy-1'
    };

    mockStore.signIn.mockResolvedValueOnce();
    (useStore as jest.Mock).mockReturnValue({
      ...mockStore,
      user: academyUser
    });

    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.login('admin@example.com', 'password');
    });

    expect(mockStore.signIn).toHaveBeenCalled();
    expect(mockStore.fetchAcademy).toHaveBeenCalledWith(academyUser.academy_id);
  });

  it('should handle login errors', async () => {
    const error = new Error('Invalid credentials');
    mockStore.signIn.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useAuth());

    await expect(
      act(async () => {
        await result.current.login('test@example.com', 'wrong')
      })
    ).rejects.toThrow('Invalid credentials');
  });
});