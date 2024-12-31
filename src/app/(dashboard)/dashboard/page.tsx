import { DashboardStats } from '@/components/dashboard/stats';
import { DashboardCharts } from '@/components/dashboard/charts';
import { TodayClasses } from '@/components/dashboard/today-classes';
import { PendingPayments } from '@/components/dashboard/pending-payments';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Panel de Control</h1>
        <p className="text-gray-600">Resumen general de tu academia</p>
      </div>

      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCharts />
        <div className="space-y-6">
          <TodayClasses />
          <PendingPayments />
        </div>
      </div>
    </div>
  );
}