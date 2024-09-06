import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <h1 class="text-9xl font-bold text-blue-600">404</h1>
      <h2 class="text-4xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
      <p class="text-lg text-gray-600 mb-8">
        The page you're looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <a
        routerLink="/"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out"
      >
        Go to Homepage
      </a>
    </div>
  `,
})
export class NotFoundComponent {}
