import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@my-deskbird-app/core/shared';
import { AuthFacade } from '@my-deskbird-app/features/authentication';

@Component({
  standalone: true,
  imports: [RouterModule, AsyncPipe, HeaderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'my-deskbird-app';
  private readonly authFacade = inject(AuthFacade);

  protected readonly isAuth$ = this.authFacade.isAuth$;
  protected readonly currentUser$ = this.authFacade.currentUser$;
  protected readonly showPopover = signal(false);

  protected logout(): void {
    this.authFacade.logout();
  }

  protected togglePopover() {
    this.showPopover.set(!this.showPopover());
  }
}
