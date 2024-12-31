import React from 'react';
import { Package, Clock, Users, Edit2, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import type { ClassPackage } from '../../stores/packageStore';
import { usePackageStore } from '../../stores/packageStore';

interface PackageCardProps {
  package: ClassPackage;
  onEdit: () => void;
}

export default function PackageCard({ package: pkg, onEdit }: PackageCardProps) {
  const { deletePackage } = usePackageStore();

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este paquete?')) {
      deletePackage(pkg.id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Package className="h-5 w-5 text-primary mr-2" />
            <h3 className="text-lg font-medium text-dark">{pkg.nombre}</h3>
          </div>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            pkg.estado === 'activo'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {pkg.estado === 'activo' ? 'Activo' : 'Inactivo'}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-600">{pkg.descripcion}</p>

        <div className="mt-4">
          <div className="text-2xl font-bold text-dark">
            {formatPrice(pkg.precio)}
            {pkg.descuento && (
              <span className="ml-2 text-sm font-normal text-green-600">
                {pkg.descuento}% descuento
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            Duración: {pkg.duracion}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            {pkg.clasesPorMes} clases por mes
            {pkg.clasesPorSemana && ` (${pkg.clasesPorSemana} por semana)`}
            <span className="ml-1">({pkg.tipoClase})</span>
          </div>
        </div>

        {pkg.beneficios.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Beneficios</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {pkg.beneficios.map((beneficio, index) => (
                <li key={index}>{beneficio}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}