import { describe, it, expect } from 'vitest';
import { 
  AppError, 
  AuthError, 
  PermissionError,
  ValidationError,
  isAppError,
  handleError 
} from '../../utils/errors';

describe('Error Handling', () => {
  it('should create AppError with correct properties', () => {
    const error = new AppError('Test error', 'TEST_ERROR', 400);
    
    expect(error.message).toBe('Test error');
    expect(error.code).toBe('TEST_ERROR');
    expect(error.status).toBe(400);
    expect(error.name).toBe('AppError');
  });

  it('should create specialized error types', () => {
    const authError = new AuthError('Auth failed');
    expect(authError.code).toBe('AUTH_ERROR');
    expect(authError.status).toBe(401);

    const permError = new PermissionError();
    expect(permError.code).toBe('PERMISSION_ERROR');
    expect(permError.status).toBe(403);

    const validationError = new ValidationError('Invalid data');
    expect(validationError.code).toBe('VALIDATION_ERROR');
    expect(validationError.status).toBe(400);
  });

  it('should identify AppError instances', () => {
    const appError = new AppError('Test', 'TEST');
    const regularError = new Error('Regular error');

    expect(isAppError(appError)).toBe(true);
    expect(isAppError(regularError)).toBe(false);
    expect(isAppError(null)).toBe(false);
    expect(isAppError(undefined)).toBe(false);
  });

  it('should handle different error types appropriately', () => {
    const appError = new AppError('App error', 'APP_ERROR');
    expect(handleError(appError)).toBe(appError);

    const regularError = new Error('Regular error');
    const handled1 = handleError(regularError);
    expect(handled1.message).toBe('Regular error');
    expect(handled1.code).toBe('UNKNOWN_ERROR');

    const handled2 = handleError('string error');
    expect(handled2.message).toBe('Ha ocurrido un error inesperado');
    expect(handled2.code).toBe('UNKNOWN_ERROR');
  });
});