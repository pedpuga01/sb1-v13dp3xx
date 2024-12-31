import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import { useClassStore } from '../../stores/classStore';

export default function ClassDistributionChart() {
  const { classes } = useClassStore();

  // Calcular distribución de clases por tipo
  const distribution = [
    {
      name: 'Clases Individuales',
      value: classes.filter(c => c.tipo === 'individual').length
    },
    {
      name: 'Clases Grupales',
      value: classes.filter(c => c.tipo === 'grupal').length
    }
  ];

  const COLORS = ['#3b82f6', '#8b5cf6'];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={distribution}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {distribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}