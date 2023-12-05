const today = new Date();

export const getDateRange = () => {
  const min = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    8
  );

  const max = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    18
  );

  return { min, max };
};
