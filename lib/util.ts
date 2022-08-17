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

export const emailValidator = (email: string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return null;
  }

  return 'Invalid email address';
};

export const creditCardNoValidator = (cardNo: string) => {
  let visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  let mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
  let amExpRegEx = /^(?:3[47][0-9]{13})$/;
  let discoverRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
  if (
    visaRegEx.test(cardNo) ||
    mastercardRegEx.test(cardNo) ||
    amExpRegEx.test(cardNo) ||
    discoverRegEx.test(cardNo)
  ) {
    return null;
  }

  return 'Invalid credit card number';
};

export const creditCardExpValidator = (expDate: string) => {
  let expRegEx = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;

  if (expRegEx.test(expDate)) {
    return null;
  }

  return 'Invalid credit card expiration date';
};

export const creditCardCVVValidator = (cvv: string) => {
  let cvvRegEx = /^[0-9]{3,4}$/;

  if (cvvRegEx.test(cvv)) {
    return null;
  }

  return 'Invalid credit card CVV';
};
