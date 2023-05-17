const USER_NAME_REGEX = /^[a-zA-Z0-9-_]{3,24}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,24}$/

export const REGEX = {
  USER_NAME_REGEX,
  PASSWORD_REGEX,
}
