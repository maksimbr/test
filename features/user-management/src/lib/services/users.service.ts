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
    const newUser = { ...user, id: this.mockUsers.length + 1 };
    return of(newUser).pipe(delay(500));
  }

  updateUser(user: UsersEntity): Observable<UsersEntity> {
    const index = this.mockUsers.findIndex((u) => u.id === user.id);
    return of(user).pipe(delay(500));
  }
}
