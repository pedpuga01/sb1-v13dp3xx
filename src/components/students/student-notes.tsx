```typescript
import { useState } from 'react';
import { Plus, MessageSquare, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Student } from '@/modules/students/types';
import { AddNoteDialog } from './add-note-dialog';

interface StudentNotesProps {
  student: Student;
}

export function StudentNotes({ student }: StudentNotesProps) {
  const [showAddNote, setShowAddNote] = useState(false);

  const noteTypeStyles = {
    academic: 'bg-blue-50 text-blue-800',
    behavioral: 'bg-yellow-50 text-yellow-800',
    general: 'bg-gray-50 text-gray-800'
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Notas y Observaciones</h3>
        <Button onClick={() => setShowAddNote(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Agregar Nota
        </Button>
      </div>

      {student.notes && student.notes.length > 0 ? (
        <div className="space-y-4">
          {student.notes.map((note) => (
            <div
              key={note.id}
              className="bg-white border rounded-lg p-4 space-y-2"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-gray-400 mr-2" />
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    noteTypeStyles[note.type]
                  }`}>
                    {note.type === 'academic' ? 'Académica' :
                     note.type === 'behavioral' ? 'Conductual' : 'General'}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {format(new Date(note.date), 'PPp', { locale: es })}
                </span>
              </div>
              
              <p className="text-gray-900">{note.content}</p>
              
              <div className="text-sm text-gray-500">
                Por: {note.created_by}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No hay notas registradas</p>
        </div>
      )}

      {showAddNote && (
        <AddNoteDialog
          studentId={student.id}
          onClose={() => setShowAddNote(false)}
        />
      )}
    </div>
  );
}
```