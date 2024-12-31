```typescript
import { AttendanceHeader } from '@/components/attendance/attendance-header';
import { AttendanceManager } from '@/components/attendance/attendance-manager';

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <AttendanceHeader />
      <AttendanceManager />
    </div>
  );
}
```