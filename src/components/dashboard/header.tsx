'use client';

import { UserNav } from './user-nav';
import { NotificationDropdown } from './notification-dropdown';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="font-semibold">Lidia</div>
        <div className="flex items-center gap-4">
          <NotificationDropdown />
          <UserNav />
        </div>
      </div>
    </header>
  );
}