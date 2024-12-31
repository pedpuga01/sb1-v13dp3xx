import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, copyFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const projectRoot = resolve(process.cwd());
const exportDir = resolve(projectRoot, 'export');

// Crear directorio de exportación
if (!existsSync(exportDir)) {
  mkdirSync(exportDir);
}

// Construir el proyecto
console.log('🏗️ Construyendo el proyecto...');
execSync('npm run build', { stdio: 'inherit' });

// Copiar archivos necesarios
console.log('📦 Copiando archivos...');
const filesToCopy = [
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'tailwind.config.js',
  'README.md',
  '.env.example'
];

filesToCopy.forEach(file => {
  if (existsSync(resolve(projectRoot, file))) {
    copyFileSync(
      resolve(projectRoot, file),
      resolve(exportDir, file)
    );
  }
});

// Copiar directorio dist
copyFileSync(
  resolve(projectRoot, 'dist'),
  resolve(exportDir, 'dist')
);

console.log('✅ Exportación completada!');
console.log(`📁 Los archivos se encuentran en: ${exportDir}`);