import { useState, useEffect } from 'react';
import { calendarApi } from '@/modules/calendar/api';
import type { CalendarEvent, CalendarFilters } from '@/modules/calendar/types';

export function useCalendar(academyId: string) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvents = async (filters?: { start: string; end: string }) => {
    try {
      setLoading(true);
      const data = await calendarApi.getEvents(academyId, filters);
      setEvents(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [academyId]);

  const addEvent = async (eventData: Omit<CalendarEvent, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newEvent = await calendarApi.create(eventData);
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      throw err;
    }
  };

  const updateEvent = async (id: string, eventData: Partial<CalendarEvent>) => {
    try {
      const updatedEvent = await calendarApi.update(id, eventData);
      setEvents(prev => prev.map(e => e.id === id ? updatedEvent : e));
      return updatedEvent;
    } catch (err) {
      throw err;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await calendarApi.delete(id);
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
    addEvent,
    updateEvent,
    deleteEvent
  };
}