import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Building2, 
  Users, 
  BarChart2, 
  Shield,
  Calendar,
  CheckCircle,
  Zap
} from 'lucide-react';
import Button from '../components/ui/Button';

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-primary">Lidia</div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Iniciar Sesión</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Prueba Gratis</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              <span className="block text-primary">Gestiona tu academia</span>
              <span className="block text-secondary mt-2">de manera inteligente</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              La plataforma todo en uno para academias de música, danza, idiomas y centros educativos. 
              Simplifica la gestión de estudiantes, clases y pagos.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="primary"
                size="lg"
                className="group"
              >
                Comienza Gratis
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
              >
                Agenda una Demo
              </Button>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              No requiere tarjeta de crédito • Cancela cuando quieras
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">
              Todo lo que necesitas en un solo lugar
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Características diseñadas para hacer tu trabajo más fácil
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Calendar,
                title: 'Gestión de Clases',
                description: 'Organiza horarios, profesores y salas de manera eficiente.'
              },
              {
                icon: Users,
                title: 'Gestión de Estudiantes',
                description: 'Seguimiento detallado del progreso y asistencia.'
              },
              {
                icon: BarChart2,
                title: 'Analíticas Avanzadas',
                description: 'Datos e insights para tomar mejores decisiones.'
              },
              {
                icon: Shield,
                title: 'Seguridad Total',
                description: 'Tus datos siempre seguros y protegidos.'
              },
              {
                icon: Zap,
                title: 'Automatización',
                description: 'Reduce tareas manuales y optimiza procesos.'
              },
              {
                icon: CheckCircle,
                title: 'Fácil de Usar',
                description: 'Interfaz intuitiva y amigable para todos.'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                  <div className="relative bg-white p-6 rounded-lg">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Comienza a optimizar tu gestión hoy mismo
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="secondary"
              size="lg"
              className="text-white"
            >
              Prueba Gratis 14 días
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white/10"
            >
              Agenda una Demo
            </Button>
          </div>
          <p className="mt-4 text-white/80">
            No requiere tarjeta de crédito • Cancela cuando quieras
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Producto</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Características</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Precios</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Seguridad</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Compañía</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Sobre Nosotros</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacidad</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Términos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                {/* Redes sociales */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 Lidia. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}