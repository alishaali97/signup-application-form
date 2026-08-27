export function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isStrongEnough(password, minLength = 6) {
  return typeof password === 'string' && password.length >= minLength;
}
