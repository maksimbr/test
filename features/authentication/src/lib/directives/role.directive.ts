import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthFacade } from '../state/auth/auth.facade';

@Directive({
  selector: '[libHasRoles]',
  standalone: true,
})
export class HasRolesDirective {
  private currentUserRole: string | undefined;
  private templateRef = inject(TemplateRef<any>);
  private viewContainerRef = inject(ViewContainerRef);
  private authFacade = inject(AuthFacade);

  constructor() {
    this.authFacade.currentUser$.subscribe((user) => {
      this.currentUserRole = user?.role;
      this.updateView();
    });
  }

  @Input() set libHasRoles(allowedRoles: string[]) {
    this.updateView(allowedRoles);
  }

  private updateView(allowedRoles: string[] = []) {
    this.viewContainerRef.clear();

    if (this.checkRole(allowedRoles)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  private checkRole(allowedRoles: string[]): boolean {
    if (!this.currentUserRole || allowedRoles.length === 0) {
      return false;
    }

    return allowedRoles.includes(this.currentUserRole);
  }
}
