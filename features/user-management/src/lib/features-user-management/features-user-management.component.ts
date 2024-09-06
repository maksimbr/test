import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersFacade } from '../state/users/users.facade';
import { UserRole, UsersEntity } from '../state/users/users.models';
import { ModalComponent } from '@my-deskbird-app/core/shared';
import { UserFormComponent } from '../components/user-form/user-form.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HasRolesDirective } from '@my-deskbird-app/features/authentication';

@Component({
  selector: 'lib-features-user-management',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    UserFormComponent,
    ReactiveFormsModule,
    HasRolesDirective,
  ],
  templateUrl: './features-user-management.component.html',
})
export class FeaturesUserManagementComponent implements OnInit {
  private readonly usersFacade = inject(UsersFacade);
  protected readonly loaded$ = this.usersFacade.loaded$;
  protected readonly currentUserRole: UserRole = UserRole.ADMIN;

  protected readonly users$ = toSignal(this.usersFacade.allUsers$);
  protected readonly searchTerm = signal('');

  protected readonly filtereUsers = computed(() =>
    this.users$()?.filter((user) =>
      this.searchTerm()
        ? user.name
            .toLocaleLowerCase()
            .includes(this.searchTerm().toLocaleLowerCase())
        : user
    )
  );

  protected readonly showModal = signal(false);
  protected readonly modalTitle = signal('');
  protected readonly selectedUser = signal<UsersEntity | null>(null);
  protected readonly formControl = inject(FormBuilder).control('');

  ngOnInit() {
    if (!this.users$()) {
      this.usersFacade.init();
    }
    this.formControl.valueChanges.subscribe((val) =>
      this.searchTerm.set(val ? val : '')
    );
  }

  openAddUserModal() {
    this.modalTitle.set('Add User');
    this.selectedUser.set(null);
    this.showModal.set(true);
  }

  openEditUserModal(user: UsersEntity) {
    this.modalTitle.set('Edit User');
    this.selectedUser.set(user);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.selectedUser.set(null);
  }

  onUserSubmit(user: UsersEntity) {
    if (this.selectedUser()) {
      this.updateUser(user);
    } else {
      this.addUser(user);
    }
    this.closeModal();
  }

  addUser(user: UsersEntity) {
    this.usersFacade.addUser(user);
  }

  updateUser(user: UsersEntity) {
    this.usersFacade.changeUser(user);
  }
}
