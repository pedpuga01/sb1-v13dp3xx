export function formatRut(rut: string): string {
  // Limpiar puntos, guiones y espacios
  let cleaned = rut.replace(/[.-]/g, '').trim();
  
  // Extraer dígito verificador
  const dv = cleaned.slice(-1);
  const numbers = cleaned.slice(0, -1);
  
  // Formatear con puntos y guión
  return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
}

export function validateRut(rut: string): boolean {
  // Validar formato básico
  if (!/^[0-9]{1,8}-[0-9kK]{1}$/.test(rut)) return false;

  const [numbers, verifier] = rut.split('-');
  const calculatedVerifier = calculateVerifier(numbers);
  
  return calculatedVerifier.toLowerCase() === verifier.toLowerCase();
}

function calculateVerifier(numbers: string): string {
  const reversed = numbers.split('').reverse();
  let sum = 0;
  let multiplier = 2;

  for (const digit of reversed) {
    sum += parseInt(digit) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = sum % 11;
  const verifier = 11 - remainder;

  if (verifier === 11) return '0';
  if (verifier === 10) return 'k';
  return verifier.toString();
}