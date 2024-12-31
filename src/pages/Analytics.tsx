import React, { useState } from 'react';
import { BarChart2, Users, MapPin, Clock, DollarSign } from 'lucide-react';
import StudentRetentionChart from '../components/analytics/StudentRetentionChart';
import ClassDistributionChart from '../components/analytics/ClassDistributionChart';
import LocationDistributionChart from '../components/analytics/LocationDistributionChart';
import AttendanceChart from '../components/analytics/AttendanceChart';
import FinancialDashboard from '../components/analytics/FinancialDashboard';
import Button from '../components/ui/Button';

type AnalyticsTab = 'general' | 'financial';

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('general');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-futura text-dark">Analíticas</h1>
        <p className="text-gray-600">Análisis y estadísticas de la academia</p>
      </div>

      <div className="flex space-x-4">
        <Button
          variant={activeTab === 'general' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('general')}
        >
          <BarChart2 className="h-4 w-4 mr-2" />
          General
        </Button>
        <Button
          variant={activeTab === 'financial' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('financial')}
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Finanzas
        </Button>
      </div>

      {activeTab === 'general' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header flex items-center">
              <Users className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-lg font-medium">Retención de Estudiantes</h2>
            </div>
            <div className="card-body">
              <StudentRetentionChart />
            </div>
          </div>

          <div className="card">
            <div className="card-header flex items-center">
              <BarChart2 className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-lg font-medium">Distribución de Clases</h2>
            </div>
            <div className="card-body">
              <ClassDistributionChart />
            </div>
          </div>

          <div className="card">
            <div className="card-header flex items-center">
              <MapPin className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-lg font-medium">Distribución por Comuna</h2>
            </div>
            <div className="card-body">
              <LocationDistributionChart />
            </div>
          </div>

          <div className="card">
            <div className="card-header flex items-center">
              <Clock className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-lg font-medium">Asistencia y Permanencia</h2>
            </div>
            <div className="card-body">
              <AttendanceChart />
            </div>
          </div>
        </div>
      ) : (
        <FinancialDashboard />
      )}
    </div>
  );
}