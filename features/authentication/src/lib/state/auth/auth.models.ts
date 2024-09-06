/**
 * Interface for the 'Auth' data
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export interface AuthEntity {
  id: string | number; // Primary ID
  name: string;
  role: UserRole;
}
