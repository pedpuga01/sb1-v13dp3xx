export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: 'class' | 'exam' | 'holiday';
  class_id?: string;
  description?: string;
  academy_id: string;
  created_at: string;
  updated_at: string;
}

export interface CalendarFilters {
  start?: string;
  end?: string;
  type?: CalendarEvent['type'];
}