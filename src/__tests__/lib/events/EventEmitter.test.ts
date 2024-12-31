import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EventEmitter } from '../../../lib/events/EventEmitter';

describe('EventEmitter', () => {
  let eventEmitter: EventEmitter;

  beforeEach(() => {
    eventEmitter = EventEmitter.getInstance();
    eventEmitter.clear();
  });

  it('should subscribe to and emit events', () => {
    const callback = vi.fn();
    eventEmitter.on('test', callback);
    
    eventEmitter.emit('test', { data: 'test' });
    expect(callback).toHaveBeenCalledWith({ data: 'test' });
  });

  it('should handle multiple subscribers', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    
    eventEmitter.on('test', callback1);
    eventEmitter.on('test', callback2);
    
    eventEmitter.emit('test');
    
    expect(callback1).toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
  });

  it('should unsubscribe correctly', () => {
    const callback = vi.fn();
    const unsubscribe = eventEmitter.on('test', callback);
    
    unsubscribe();
    eventEmitter.emit('test');
    
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle errors in callbacks', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const callback = () => { throw new Error('Test error'); };
    
    eventEmitter.on('test', callback);
    eventEmitter.emit('test');
    
    expect(consoleError).toHaveBeenCalled();
  });
});