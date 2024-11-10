const initPrismaDate = (d: Date) => {
  const date = new Date();
  return new Date(d.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
};

export { initPrismaDate };
