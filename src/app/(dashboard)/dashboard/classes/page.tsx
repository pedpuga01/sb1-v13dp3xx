import { ClassesHeader } from '@/components/classes/classes-header';
import { ClassesGrid } from '@/components/classes/classes-grid';

export default function ClassesPage() {
  return (
    <div className="space-y-6">
      <ClassesHeader />
      <ClassesGrid />
    </div>
  );
}