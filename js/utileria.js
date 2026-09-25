
// Recibe un texto (correo) y revisa que tenga la forma usuario@dominio.extension,
// sin espacios y con al menos un punto después del @. Devuelve true/false.
function validarCorreo(correo) {
  if (typeof correo !== "string") return false; 
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; 
  return patron.test(correo.trim());
}

// Recibe un texto (por ejemplo un nombre) y revisa que esté compuesto
// únicamente por letras (mayúsculas o minúsculas), vocales acentuadas
// (á, é, í, ó, ú, Á, É, Í, Ó, Ú), ñ/Ü y espacios entre palabras.
// No acepta números ni símbolos. Devuelve true/false.
function soloLetras(texto) {
  if (typeof texto !== "string" || texto.trim() === "") return false;
  const patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
  return patron.test(texto);
}

// Recibe un número (o texto numérico) y una longitud máxima permitida.
// Cuenta cuántos dígitos tiene el número (sin contar signo ni puntos) y
// devuelve true solo si esa cantidad de dígitos no supera maxLongitud.
function validarLongitud(numero, maxLongitud) {
  if (numero === null || numero === undefined) return false;
  const soloDigitos = String(numero).replace(/[^0-9]/g, "");
  if (soloDigitos.length === 0) return false;
  return soloDigitos.length <= maxLongitud;
}

// Recibe una fecha de nacimiento (string "YYYY-MM-DD" o un objeto Date) y
// calcula la edad en años cumplidos comparándola con la fecha actual,
// ajustando si aún no ha pasado el mes/día de cumpleaños este año.
// Devuelve un número entero (o NaN si la fecha no es válida).
function calcularEdad(fechaNacimiento) {
  const nacimiento = new Date(fechaNacimiento);
  if (isNaN(nacimiento.getTime())) return NaN;

  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mesActual = hoy.getMonth() - nacimiento.getMonth();
  const noHaCumplidoAun =
    mesActual < 0 || (mesActual === 0 && hoy.getDate() < nacimiento.getDate());

  if (noHaCumplidoAun) edad--;
  return edad;
}

// Recibe una fecha de nacimiento, reutiliza calcularEdad() para obtener
// la edad y devuelve true si esa edad es 18 años o más.
function esMayorDeEdad(fechaNacimiento) {
  const edad = calcularEdad(fechaNacimiento);
  if (isNaN(edad)) return false;
  return edad >= 18;
}

// Recibe un texto (contraseña) y verifica que cumpla las 5 reglas de
// seguridad: al menos una mayúscula, al menos una minúscula, al menos
// un número, al menos un carácter especial y un mínimo de 8 caracteres
// de longitud total. Devuelve true solo si se cumplen todas.
function validarPassword(password) {
  if (typeof password !== "string") return false;
  const tieneMayuscula = /[A-Z]/.test(password);
  const tieneMinuscula = /[a-z]/.test(password);
  const tieneNumero = /[0-9]/.test(password);
  const tieneEspecial = /[^A-Za-z0-9]/.test(password);
  const longitudValida = password.length >= 8;
  return (
    tieneMayuscula &&
    tieneMinuscula &&
    tieneNumero &&
    tieneEspecial &&
    longitudValida
  );
}

// Recibe un número de teléfono en cualquier formato (con espacios,
// guiones o paréntesis) y, si contiene exactamente 10 dígitos, devuelve
// un string formateado como "(XXX) XXX-XXXX". Si no tiene 10 dígitos,
// devuelve null. Resuelve el problema de que cada quien captura su
// teléfono con un formato distinto.
function formatearTelefono(telefono) {
  if (typeof telefono !== "string" && typeof telefono !== "number")
    return null;
  const digitos = String(telefono).replace(/\D/g, "");
  if (digitos.length !== 10) return null;
  const lada = digitos.slice(0, 3);
  const parte1 = digitos.slice(3, 6);
  const parte2 = digitos.slice(6, 10);
  return `(${lada}) ${parte1}-${parte2}`;
}

// Recibe un texto (por ejemplo un nombre capturado en un formulario) y
// devuelve el mismo texto con la primera letra de cada palabra en
// mayúscula y el resto en minúscula, respetando acentos y ñ. Sirve
// para normalizar nombres que el usuario escribe en minúsculas o en
// MAYÚSCULAS.
function capitalizarPalabras(texto) {
  if (typeof texto !== "string") return "";
  return texto
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");
}
