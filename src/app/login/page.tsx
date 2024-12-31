import { LoginForm } from '@/components/auth/login-form';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary">Bienvenido a Lidia</h1>
            <p className="mt-2 text-gray-600">
              Inicia sesión para acceder a tu cuenta
            </p>
          </div>
          
          <LoginForm />
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="Students studying"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}