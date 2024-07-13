export const isPasswordStrongEnough = (password: string): boolean => {
  if (password.length < 8) return false;
  if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).*$/gi)) return false;

  return true;
};
