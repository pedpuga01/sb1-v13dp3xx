import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { useStudentStore } from '../../stores/studentStore';

export default function StudentRetentionChart() {
  const { students } = useStudentStore();

  // Simulación de datos de retención
  const data = [
    { mes: 'Ene', activos: 25, inactivos: 2 },
    { mes: 'Feb', activos: 28, inactivos: 3 },
    { mes: 'Mar', activos: 32, inactivos: 2 },
    { mes: 'Abr', activos: 35, inactivos: 4 },
    { mes: 'May', activos: 38, inactivos: 3 },
    { mes: 'Jun', activos: 42, inactivos: 5 },
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="activos"
            stroke="#22c55e"
            name="Estudiantes Activos"
          />
          <Line
            type="monotone"
            dataKey="inactivos"
            stroke="#ef4444"
            name="Estudiantes Inactivos"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}