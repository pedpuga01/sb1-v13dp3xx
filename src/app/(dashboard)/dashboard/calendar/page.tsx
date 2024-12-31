import { CalendarHeader } from '@/components/calendar/calendar-header';
import { CalendarView } from '@/components/calendar/calendar-view';

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <CalendarHeader />
      <CalendarView />
    </div>
  );
}