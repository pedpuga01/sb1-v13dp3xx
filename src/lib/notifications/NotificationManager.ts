import { supabase } from '../supabase/client';
import { eventEmitter } from '../events/EventEmitter';
import { EVENTS } from '../events/events';
import type { Notification } from './types';

export class NotificationManager {
  private static instance: NotificationManager;
  private subscription: any;

  private constructor() {
    this.setupRealtimeSubscription();
  }

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  private setupRealtimeSubscription() {
    this.subscription = supabase
      .channel('notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications'
      }, (payload) => {
        const notification = payload.new as Notification;
        eventEmitter.emit(EVENTS.NOTIFICATION_RECEIVED, notification);
      })
      .subscribe();
  }

  async create(notification: Omit<Notification, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notification)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async markAsRead(id: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);

    if (error) throw error;
  }

  async getUnread(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .eq('read', false)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  cleanup() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

export const notificationManager = NotificationManager.getInstance();