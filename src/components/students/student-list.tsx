```typescript
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useStudents } from '@/modules/students/hooks/use-students';
import { StudentRow } from './student-row';
import { StudentFilters } from './student-filters';
import type { StudentFilters as FilterType } from '@/modules/students/types';

export function StudentList() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterType>({});
  const { students, loading } = useStudents('academy-id'); // TODO: Get from context

  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Buscar estudiantes..."
          onChange={(e) => handleSearch(e.target.value)}
          icon={<Search className="h-4 w-4" />}
          className="flex-1"
        />
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      {showFilters && (
        <StudentFilters
          filters={filters}
          onChange={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    Cargando estudiantes...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No se encontraron estudiantes
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <StudentRow key={student.id} student={student} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
```