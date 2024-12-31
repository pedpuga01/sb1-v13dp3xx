import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default function AttendanceChart() {
  // Simulación de datos de asistencia
  const data = [
    { mes: 'Ene', asistencia: 92, permanencia: 95 },
    { mes: 'Feb', asistencia: 88, permanencia: 93 },
    { mes: 'Mar', asistencia: 94, permanencia: 92 },
    { mes: 'Abr', asistencia: 91, permanencia: 90 },
    { mes: 'May', asistencia: 89, permanencia: 88 },
    { mes: 'Jun', asistencia: 93, permanencia: 91 },
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="asistencia"
            name="% Asistencia"
            fill="#3b82f6"
            barSize={20}
          />
          <Line
            type="monotone"
            dataKey="permanencia"
            name="% Permanencia"
            stroke="#f59e0b"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}