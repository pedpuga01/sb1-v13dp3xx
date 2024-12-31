import { useState, useEffect, useCallback } from 'react';
import { notificationManager } from '../lib/notifications/NotificationManager';
import { useEvents } from './useEvents';
import { EVENTS } from '../lib/events/events';
import type { Notification } from '../lib/notifications/types';

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { subscribe } = useEvents();

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await notificationManager.getUnread(userId);
      setNotifications(data);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await notificationManager.markAsRead(id);
      setNotifications(current => 
        current.filter(n => n.id !== id)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }, []);

  useEffect(() => {
    loadNotifications();

    const unsubscribe = subscribe(EVENTS.NOTIFICATION_RECEIVED, (notification: Notification) => {
      if (notification.user_id === userId) {
        setNotifications(current => [notification, ...current]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userId, loadNotifications, subscribe]);

  return {
    notifications,
    loading,
    markAsRead
  };
}