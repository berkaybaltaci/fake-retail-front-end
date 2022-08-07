export const isProductsPageActive = (link: string) => {
  return (
    link.length > 1 && link.substring(0, link.length - 1) == '/products/page/'
  );
};

export const usernameValidator = (username: string) => {
  if (!username || username.trim().length === 0) {
    return 'Username cannot be empty';
  } else if (username.includes(' ')) {
    return 'Username cannot contain empty spaces';
  } else if (username.length < 3) {
    return 'Username cannot be less than 3 characters';
  } else if (!/^[a-z0-9_]+$/i.test(username)) {
    return 'Username can only contain alphanumeric characters and underscores';
  }
  return null;
};

export const passwordValidator = (password: string) => {
  if (!password || password.trim().length === 0) {
    return 'Password cannot be empty';
  } else if (password.includes(' ')) {
    return 'Password cannot contain empty spaces';
  } else if (password.length < 6) {
    return 'Password cannot be less than 6 characters';
  } else if (!/^[a-z0-9_]+$/i.test(password)) {
    return 'Password can only contain alphanumeric characters and underscores';
  }
  return null;
};
