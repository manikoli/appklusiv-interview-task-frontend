/* eslint-disable no-useless-escape */
export function emailValid(email: string): boolean {
  if (email === '') {
    return false
  }

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true
  } else {
    return false
  }
}

export enum PasswordValidationResponse {
  lowerCase = 'Password must contain at least one lowercase letter!',
  capitalCase = 'Password must contain at least one capital letter!',
  number = 'Password must contain at least one number!',
  special = 'Password must contain at least one special character!',
  length = 'Password needs to be 8 or more characters long!',
  valid = 'Password is valid!',
  invalid = 'Password is not valid!',
  empty = 'Password must not be empty!',
}

export function passwordValid(password: string): PasswordValidationResponse {
  let lowerCaseLettersValid = false
  let capitalLettersValid = false
  let numberValid = false
  let specialCharacterValid = false
  let lengthValid = false

  if (password === '') {
    return PasswordValidationResponse.empty
  }

  const lowerCaseLetters = /[a-z]/g
  if (password.match(lowerCaseLetters) != null) {
    lowerCaseLettersValid = true
  } else {
    return PasswordValidationResponse.lowerCase
  }

  const upperCaseLetters = /[A-Z]/g
  if (password.match(upperCaseLetters) != null) {
    capitalLettersValid = true
  } else {
    return PasswordValidationResponse.capitalCase
  }

  const numbers = /[0-9]/g
  if (password.match(numbers) != null) {
    numberValid = true
  } else {
    return PasswordValidationResponse.number
  }

  const specialCharacters = /[!@#$%^&*]/g
  if (password.match(specialCharacters) != null) {
    specialCharacterValid = true
  } else {
    return PasswordValidationResponse.special
  }

  if (password.length >= 8) {
    lengthValid = true
  } else {
    return PasswordValidationResponse.length
  }

  if (
    lowerCaseLettersValid &&
    capitalLettersValid &&
    numberValid &&
    specialCharacterValid &&
    lengthValid
  ) {
    return PasswordValidationResponse.valid
  }

  return PasswordValidationResponse.invalid
}
