import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthEntity } from '@my-deskbird-app/features/authentication';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="bg-blue-500 text-white p-2 flex items-center justify-between"
    >
      <h1 class="text-lg font-bold">Deskbird App</h1>

      @if(currentUser(); as user) {
      <div class="relative">
        <button
          type="button"
          (click)="togglePopover()"
          class="flex items-center focus:outline-none"
        >
          <span class="mr-2">{{ user.name }}</span>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        @if(showPopover()) {
        <div
          class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <span class="text-black px-4 py-2 text-sm"
            >Role: {{ user.role }}</span
          >
          <div class="py-1" role="none">
            <a
              (click)="logout.emit()"
              class="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              >Logout</a
            >
          </div>
        </div>
        }
      </div>
      }
    </header>
  `,
})
export class HeaderComponent {
  currentUser = input.required<AuthEntity | null>();
  logout = output<void>();

  protected readonly showPopover = signal(false);

  protected togglePopover() {
    this.showPopover.set(!this.showPopover());
  }
}
