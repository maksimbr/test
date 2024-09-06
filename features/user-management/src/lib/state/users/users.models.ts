/**
 * Interface for the 'Users' data
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export interface UsersEntity {
  id: number; // Primary ID
  name: string;
  password?: string;
  role: UserRole;
}
