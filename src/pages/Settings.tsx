import React, { useState } from 'react';
import { Building2, Users, Calendar } from 'lucide-react';
import RoomManagement from '../components/settings/RoomManagement';
import AcademySettings from '../components/settings/AcademySettings';
import UserManagement from '../components/settings/UserManagement';
import NonWorkingDays from '../components/settings/NonWorkingDays';
import Button from '../components/ui/Button';

type SettingsTab = 'academia' | 'usuarios' | 'salas' | 'calendario';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('academia');

  const tabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'academia',
      label: 'Información de Academia',
      icon: <Building2 className="h-5 w-5" />
    },
    {
      id: 'usuarios',
      label: 'Gestión de Usuarios',
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 'salas',
      label: 'Gestión de Salas',
      icon: <Building2 className="h-5 w-5" />
    },
    {
      id: 'calendario',
      label: 'Calendario y Horarios',
      icon: <Calendar className="h-5 w-5" />
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-futura text-dark">Configuración</h1>
        <p className="text-gray-600">Gestiona la configuración de tu academia</p>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'outline'}
                onClick={() => setActiveTab(tab.id)}
                className="py-4"
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </Button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'academia' && <AcademySettings />}
          {activeTab === 'usuarios' && <UserManagement />}
          {activeTab === 'salas' && <RoomManagement />}
          {activeTab === 'calendario' && <NonWorkingDays />}
        </div>
      </div>
    </div>
  );
}