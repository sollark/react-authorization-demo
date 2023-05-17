export type UserRole = 1000 | 1001 | 1010 | 1100 | 1111

export const USER_ROLE = {
  Guest: 1000 as UserRole,
  Employee: 1001 as UserRole,
  Manager: 1010 as UserRole,
  Supervisor: 1100 as UserRole,
  Admin: 1111 as UserRole,
}
