"use client"
import { useState, useEffect } from "react";
/**
 * Hook personalizado para aplicar un retraso (debounce) a un valor.
 * Este hook devuelve un valor que se actualiza solo después de un período de espera
 * especificado. Esto es útil para evitar actualizaciones excesivas de estado al manejar
 * entradas de usuario, como la búsqueda en un campo de texto.
 *
 * @param {T} value - El valor que se va a "debouncear".
 * @param {number} delay - El tiempo de retraso en milisegundos antes de que el valor se actualice.
 * @returns {T} - El valor "debounceado", que se actualiza después de `delay` milisegundos.
 */
function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
