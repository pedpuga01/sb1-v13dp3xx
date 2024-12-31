import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useClasses } from '@/hooks/use-classes';
import { ClassCard } from './class-card';

export function ClassesGrid() {
  const [search, setSearch] = useState('');
  const { classes, loading } = useClasses('academy-id'); // TODO: Get from context

  const filteredClasses = classes.filter(class_ => 
    class_.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-4">
        <Input
          placeholder="Buscar clases..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="h-4 w-4" />}
        />
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">
          Cargando clases...
        </div>
      ) : filteredClasses.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No se encontraron clases
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((class_) => (
            <ClassCard key={class_.id} class_={class_} />
          ))}
        </div>
      )}
    </div>
  );
}