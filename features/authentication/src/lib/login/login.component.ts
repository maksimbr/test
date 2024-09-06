import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { AuthFacade } from '../state/auth/auth.facade';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, AsyncPipe],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  private readonly authFacade = inject(AuthFacade);

  loaded$ = this.authFacade.loaded$;
  error$ = this.authFacade.error$;

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username as string;
      const password = this.loginForm.value.username as string;
      // Dispatch the 'login' action to the NgRx store
      this.authFacade.login(username, password);
    } else {
      // Handle form validation errors (e.g., display error messages)
      // You can use Angular's built-in form validation or a library like ngx-errors
      // for more advanced validation and error handling.
    }
  }
}
