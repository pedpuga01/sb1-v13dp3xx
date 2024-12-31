import { useState, useRef } from 'react';
import { Upload, X, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStudents } from '@/hooks/use-students';

export function ImportStudentsDialog({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [importing, setImporting] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addStudent } = useStudents();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        setErrors(['Por favor, selecciona un archivo CSV válido']);
        return;
      }
      setFile(selectedFile);
      setErrors([]);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    setErrors([]);

    try {
      const text = await file.text();
      const rows = text.split('\n').slice(1); // Skip header row
      const validationErrors: string[] = [];
      const validStudents = [];

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i].split(',');
        if (row.length < 3) continue;

        const [full_name, email, phone] = row;
        
        // Validación básica
        if (!full_name || !email) {
          validationErrors.push(`Fila ${i + 2}: Nombre y email son requeridos`);
          continue;
        }

        validStudents.push({
          full_name: full_name.trim(),
          email: email.trim(),
          phone: phone?.trim(),
          role: 'student',
          status: 'active'
        });
      }

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }

      // Importar estudiantes válidos
      for (const student of validStudents) {
        await addStudent(student);
      }

      setSuccess(true);
      setTimeout(onClose, 2000);

    } catch (error) {
      setErrors(['Error al procesar el archivo']);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Importar Estudiantes</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-medium">¡Importación exitosa!</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".csv"
                  className="hidden"
                />
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-500 mb-2">
                  Arrastra y suelta tu archivo CSV aquí o
                </p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Seleccionar Archivo
                </Button>
                {file && (
                  <p className="mt-2 text-sm text-gray-500">
                    Archivo seleccionado: {file.name}
                  </p>
                )}
              </div>

              {errors.length > 0 && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-2" />
                    <div>
                      <h3 className="text-sm font-medium text-red-800">
                        Se encontraron errores:
                      </h3>
                      <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                onClick={handleImport}
                loading={importing}
                disabled={!file || importing}
              >
                {importing ? 'Importando...' : 'Importar'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}