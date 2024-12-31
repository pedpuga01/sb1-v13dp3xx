import React from 'react';
import { UserCircle } from 'lucide-react';

export default function UserMenu() {
  return (
    <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
      <UserCircle className="h-8 w-8" />
      <span className="text-sm font-medium">Mi Cuenta</span>
    </button>
  );
}