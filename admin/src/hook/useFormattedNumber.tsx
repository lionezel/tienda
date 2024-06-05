import { useState } from "react";

const formatNumber = (num: number | string): string => {
  // Eliminar cualquier separador de miles existente
  const formattedNumber = typeof num === 'string' ? num.replace(/\./g, '') : num.toString().replace(/\./g, '');
  // Aplicar el nuevo formateo
  return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const useFormattedNumber = (initialValue: number | string) => {
  const [value, setValue] = useState<string>(formatNumber(initialValue));

  const handleChange = (newValue: number | string): void => {
    const formattedValue = formatNumber(newValue);
    setValue(formattedValue);
  };

  return {
    value,
    setValue: handleChange,
  };
};
