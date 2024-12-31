import { createClient } from '@/lib/supabase/auth';
import type { CalendarEvent } from './types';

export const calendarApi = {
  getEvents: async (academyId: string, filters?: { start: string; end: string }) => {
    const supabase = createClient();
    let query = supabase
      .from('calendar_events')
      .select('*')
      .eq('academy_id', academyId);

    if (filters?.start) {
      query = query.gte('start', filters.start);
    }
    if (filters?.end) {
      query = query.lte('end', filters.end);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as CalendarEvent[];
  },

  create: async (event: Omit<CalendarEvent, 'id' | 'created_at' | 'updated_at'>) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('calendar_events')
      .insert([event])
      .select()
      .single();

    if (error) throw error;
    return data as CalendarEvent;
  },

  update: async (id: string, event: Partial<CalendarEvent>) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('calendar_events')
      .update(event)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as CalendarEvent;
  },

  delete: async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('calendar_events')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};