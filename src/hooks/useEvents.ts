import { useEffect, useCallback } from 'react';
import { eventEmitter } from '../lib/events/EventEmitter';
import type { EventType } from '../lib/events/events';

export function useEvents() {
  const subscribe = useCallback((event: EventType, callback: Function) => {
    return eventEmitter.on(event, callback);
  }, []);

  const emit = useCallback((event: EventType, data?: any) => {
    eventEmitter.emit(event, data);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      eventEmitter.clear();
    };
  }, []);

  return { subscribe, emit };
}