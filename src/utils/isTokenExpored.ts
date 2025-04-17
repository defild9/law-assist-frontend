export const isTokenExpired = (expiresIn: number) => {
  if (!expiresIn) return true;

  return Date.now() > Number(expiresIn);
};
