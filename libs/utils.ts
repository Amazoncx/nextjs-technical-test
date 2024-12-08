export const formatCurrency = (value: string): string => {
    // Eliminar caracteres no numéricos excepto el punto
    const numericValue = value.replace(/[^0-9]/g, '');

    // Formatear la parte entera con separador de miles
    const formattedInteger = numericValue
      ? parseInt(numericValue, 10).toLocaleString('en-US')
      : '0';

    // Agregar el símbolo de dólar
    return formattedInteger === '0' ? '' : `$${formattedInteger}`;
  };