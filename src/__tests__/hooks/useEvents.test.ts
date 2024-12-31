import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { useEvents } from '../../hooks/useEvents';
import { EVENTS } from '../../lib/events/events';

describe('useEvents', () => {
  it('should subscribe to events', () => {
    const { result } = renderHook(() => useEvents());
    const callback = vi.fn();
    
    const unsubscribe = result.current.subscribe(EVENTS.STUDENT_CREATED, callback);
    result.current.emit(EVENTS.STUDENT_CREATED, { id: '1' });
    
    expect(callback).toHaveBeenCalledWith({ id: '1' });
    unsubscribe();
  });

  it('should clean up subscriptions on unmount', () => {
    const { result, unmount } = renderHook(() => useEvents());
    const callback = vi.fn();
    
    result.current.subscribe(EVENTS.STUDENT_CREATED, callback);
    unmount();
    
    result.current.emit(EVENTS.STUDENT_CREATED);
    expect(callback).not.toHaveBeenCalled();
  });
});