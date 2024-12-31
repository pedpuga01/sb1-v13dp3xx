import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { 
  validateData, 
  emailSchema, 
  passwordSchema,
  phoneSchema,
  userSchema 
} from '../../utils/validation';
import { ValidationError } from '../../utils/errors';

describe('Validation', () => {
  it('should validate data against schema', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number()
    });

    const validData = { name: 'Test', age: 25 };
    expect(validateData(schema, validData)).toEqual(validData);

    expect(() => validateData(schema, { name: 'Test' }))
      .toThrow(ValidationError);
  });

  it('should validate email format', () => {
    expect(() => validateData(emailSchema, 'test@example.com')).not.toThrow();
    expect(() => validateData(emailSchema, 'invalid-email')).toThrow(ValidationError);
  });

  it('should validate password requirements', () => {
    expect(() => validateData(passwordSchema, 'password123')).not.toThrow();
    expect(() => validateData(passwordSchema, 'short')).toThrow(ValidationError);
  });

  it('should validate phone format', () => {
    expect(() => validateData(phoneSchema, '+56912345678')).not.toThrow();
    expect(() => validateData(phoneSchema, '12345')).toThrow(ValidationError);
  });

  it('should validate user data', () => {
    const validUser = {
      email: 'test@example.com',
      password: 'password123',
      full_name: 'Test User',
      role: 'admin' as const
    };

    expect(validateData(userSchema, validUser)).toEqual(validUser);

    expect(() => validateData(userSchema, {
      ...validUser,
      role: 'invalid-role'
    })).toThrow(ValidationError);
  });
});