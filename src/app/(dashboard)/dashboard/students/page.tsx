import { StudentsHeader } from '@/components/students/students-header';
import { StudentsTable } from '@/components/students/students-table';
import { StudentForm } from '@/components/students/student-form';

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <StudentsHeader />
      <StudentsTable />
    </div>
  );
}