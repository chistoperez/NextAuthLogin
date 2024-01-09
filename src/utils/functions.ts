export const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? "" : "Please enter a valid email address";
};

export const validatePassword = (password: string): string => {
  return password.length >= 6
    ? ""
    : "Password must be at least 6 characters long";
};
