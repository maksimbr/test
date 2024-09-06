import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { UserRole } from '../state/auth/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly adminUser = {
    username: 'admin',
    password: 'admin',
  };

  // Simulates a login request
  login(username: string, password: string) {
    // Replace this with your mock logic
    return of({ success: true, token: 'mock-token' }).pipe(
      delay(1000), // Simulate a network delay
      map((result) => ({
        ...result,
        role:
          this.adminUser.username === username &&
          this.adminUser.password === password
            ? UserRole.ADMIN
            : UserRole.USER,
      }))
    );
  }

  logout(): Observable<{ success: boolean }> {
    return of({ success: true });
  }
}
