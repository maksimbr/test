import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserRole, UsersEntity } from '../state/users/users.models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private mockUsers: UsersEntity[] = [
    { id: 1, name: 'John Doe', role: UserRole.USER },
    { id: 2, name: 'Jane Smith', role: UserRole.USER },
    { id: 3, name: 'Bob Johnson', role: UserRole.USER },
  ];

  getUsers(): Observable<UsersEntity[]> {
    return of(this.mockUsers).pipe(delay(500));
  }

  addUser(user: UsersEntity): Observable<UsersEntity> {
    const newUser = { ...user, id: Math.ceil(Math.random() * 100) };
    return of(newUser).pipe(delay(500));
  }

  updateUser(user: UsersEntity): Observable<UsersEntity> {
    return of(user).pipe(delay(500));
  }
}
