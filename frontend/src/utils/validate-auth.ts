export const validateAuth = (token: string, expirationTime: number) =>
  token.trim() !== "" && !isNaN(expirationTime) && expirationTime > Date.now();
