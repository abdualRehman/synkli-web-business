//email validator
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

//validate website links
export function validateWebLink(link) {
  const webLinkRegex =
    /^(http|https):\/\/([\w.-]+)(\.[\w.-]+)([\w\-.~:/?#[\]@!$&'()*+,;=]*)?$/;
  return link === "" || webLinkRegex.test(link);
}
//passwor match validation
export const validatePasswords = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return false; // Passwords do not match
  } else {
    return true; // Passwords are valid and matc
  }
};
//aus phone number validation
export function validateAustralianPhoneNumber(phoneNumber) {
  // const phoneRegex = /^(?:\+61|0)4(?:[ -]?[0-9]){8}$/;
  // return phoneRegex.test(phoneNumber);
  return phoneNumber.length === 12
}

//ABN number validation
export const abnValidation = (abn) => {
  if (abn.length !== 11) {
    return false;
  } else {
    return true;
  }
};

//validate account number
export function validateAccountNumber(accountNumber) {
  const sanitizedAccountNumber = accountNumber.replace(/\s/g, "");
  const isValidLength = /^\d{1,10}$/.test(sanitizedAccountNumber);
  return isValidLength;
}

//validate CVV
export function isValidCVV(cvv) {
  // Remove any non-digit characters from the input
  const cleanedCVV = cvv.replace(/\D/g, "");

  // Check if the cleaned input contains only digits and has a valid length (3 or 4 digits)
  return /^\d{3,4}$/.test(cleanedCVV);
}

//text input validation
export function containsNumber(input) {
  // Check if the input contains any digit (0-9)
  return /\d/.test(input);
}

export function hasMinimumLength(password) {
  return password.length >= 8;
}
export function hasLowercaseLetter(password) {
  var lowercaseRegex = /^(?=.*[a-z])/;
  return lowercaseRegex.test(password);
}
export function hasUppercaseLetter(password) {
  var uppercaseRegex = /^(?=.*[A-Z])/;
  return uppercaseRegex.test(password);
}
export function hasNumber(password) {
  var numberRegex = /^(?=.*\d)/;
  return numberRegex.test(password);
}
export function hasSpecialCharacter(password) {
  var specialCharRegex = /^(?=.*[!@#$%^&*()\-_=+{}[\]|\\:;'"<>?,./])/;
  return specialCharRegex.test(password);
}

export function getPasswordProficiency(password) {
  var lengthRegex = /^.{8,}$/;
  var lowercaseRegex = /^(?=.*[a-z])/;
  var uppercaseRegex = /^(?=.*[A-Z])/;
  var numberRegex = /^(?=.*\d)/;
  var specialCharRegex = /^(?=.*[!@#$%^&*()\-_=+{}[\]|\\:;'"<>?,./])/;

  if (
    !lengthRegex.test(password) ||
    !lowercaseRegex.test(password) ||
    !uppercaseRegex.test(password)
  ) {
    return "weak";
  } else if (
    lengthRegex.test(password) &&
    lowercaseRegex.test(password) &&
    uppercaseRegex.test(password) &&
    !numberRegex.test(password)
  ) {
    return "medium";
  } else if (
    lengthRegex.test(password) &&
    lowercaseRegex.test(password) &&
    uppercaseRegex.test(password) &&
    numberRegex.test(password) &&
    specialCharRegex.test(password)
  ) {
    return "strong";
  }
}

export const validateTextField = (input) => {
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(input);
};
