import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { useStudentStore } from '../../stores/studentStore';

export default function LocationDistributionChart() {
  const { students } = useStudentStore();

  // Agrupar estudiantes por comuna
  const communeDistribution = students.reduce((acc, student) => {
    const comuna = student.direccion?.comuna || 'No especificada';
    acc[comuna] = (acc[comuna] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(communeDistribution).map(([comuna, cantidad]) => ({
    comuna,
    cantidad
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="comuna" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad" name="Estudiantes" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}