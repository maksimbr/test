import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserRole } from '@my-deskbird-app/features/authentication';
import { UsersEntity } from '../../state/users/users.models';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'lib-user-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NgForOf],
  template: ` <form
    [formGroup]="userForm"
    (ngSubmit)="onSubmit()"
    class="space-y-4"
  >
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700"
        >Name</label
      >
      <input
        type="text"
        id="name"
        formControlName="name"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      />
    </div>

    <div>
      <label for="role" class="block text-sm font-medium text-gray-700"
        >Role</label
      >
      <select
        id="role"
        formControlName="role"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      >
        <option *ngFor="let role of roles" [value]="role">{{ role }}</option>
      </select>
    </div>

    @if(!user()) {
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700"
        >Password</label
      >
      <input
        type="password"
        id="password"
        formControlName="password"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      />
    </div>
    }

    <div class="flex justify-between">
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        {{ user() ? 'Update' : 'Add' }} User
      </button>
      <button
        type="button"
        (click)="onCancel()"
        class="bg-gray-300 text-gray-700 px-4 py-2 rounded"
      >
        Cancel
      </button>
    </div>
  </form>`,
})
export class UserFormComponent {
  user = input<UsersEntity | null>();
  readonly submitUser = output<UsersEntity>();
  readonly cancel = output<void>();

  private fb = inject(FormBuilder);

  protected readonly userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    role: [UserRole.USER, Validators.required],
    password: ['', Validators.required],
  });
  protected readonly roles = Object.values(UserRole);

  ngOnInit() {
    if (this.user()) {
      this.userForm.patchValue(this.user()!);
      this.userForm.get('password')?.clearValidators();
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData: UsersEntity = {
        ...this.userForm.value,
        id: this.user() ? this.user()?.id : null,
      };
      this.submitUser.emit(userData);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
