export const getFormats = (orientation: string) => {
  if (orientation === 'v') {
    return ['h', 'v', 'sq'];
  }

  if (orientation === 'h') {
    return ['h', 'sq'];
  }

  return ['h', 'v', 'sq'];
};
