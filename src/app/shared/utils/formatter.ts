export const capitalizeText = (value: string): string => {
  return typeof value === 'string'
    ? `${value.substring(0, 1).toUpperCase()}${value
        .substring(1)
        .toLowerCase()}`
    : '';
};
