import { useState } from "react";

const formatNumber = (num: number | string): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const useFormattedNumber = (initialValue: number | string) => {
  const [value, setValue] = useState<string>(formatNumber(initialValue));

  const handleChange = (value: number | string): void => {
    const formattedValue = formatNumber(value);
    setValue(formattedValue);
  };
  
  return {
    value,
    setValue: handleChange,
  };
};
