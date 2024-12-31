import React, { useState } from 'react';
import { DollarSign, TrendingUp, AlertCircle, FileText, Download } from 'lucide-react';
import Button from '../ui/Button';
import FinancialKPIs from './financial/FinancialKPIs';
import PaymentControl from './financial/PaymentControl';
import InvoiceGenerator from './financial/InvoiceGenerator';
import FinancialReports from './financial/FinancialReports';

type FinancialTab = 'kpis' | 'payments' | 'invoices' | 'reports';

export default function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState<FinancialTab>('kpis');

  const tabs = [
    {
      id: 'kpis',
      label: 'KPIs Financieros',
      icon: TrendingUp
    },
    {
      id: 'payments',
      label: 'Control de Pagos',
      icon: DollarSign
    },
    {
      id: 'invoices',
      label: 'Facturación',
      icon: FileText
    },
    {
      id: 'reports',
      label: 'Reportes',
      icon: Download
    }
  ] as const;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'primary' : 'outline'}
                  onClick={() => setActiveTab(tab.id)}
                  className="py-4"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </Button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'kpis' && <FinancialKPIs />}
          {activeTab === 'payments' && <PaymentControl />}
          {activeTab === 'invoices' && <InvoiceGenerator />}
          {activeTab === 'reports' && <FinancialReports />}
        </div>
      </div>
    </div>
  );
}