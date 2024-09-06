import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('@my-deskbird-app/features/user-management').then(
        (m) => m.FeaturesUserManagementComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('@my-deskbird-app/features/authentication').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('@my-deskbird-app/core/shared').then((m) => m.NotFoundComponent),
  },
];
