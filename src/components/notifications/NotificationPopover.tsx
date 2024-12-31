import { useState } from 'react';
import NotificationBell from './NotificationBell';
import NotificationList from './NotificationList';

export default function NotificationPopover() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        <NotificationBell />
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40">
            <div className="py-1">
              <NotificationList />
            </div>
          </div>
        </>
      )}
    </div>
  );
}