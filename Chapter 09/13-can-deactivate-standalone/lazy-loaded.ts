import { Component, Input } from '@angular/core';
import {
  RouterLink,
  RouterOutlet,
  Route,
  CanDeactivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h2>{{ username }}'s Contact Page</h2>
    <router-outlet />
  `,
})
class ContactPageComponent {
  @Input() username: string = '';
}

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h2>Contact Details</h2>
    <a routerLink="edit">Edit</a>
  `,
})
class ContactDetailsComponent {}

@Component({
  selector: 'app-edit-contact-details',
  standalone: true,
  template: `
    <h2>Edit Contact Details</h2>
    <button (click)="isEditing = !isEditing">isEditing: {{ isEditing }}</button>
  `,
})
class EditContactDetailsComponent {
  isEditing = false;
}

const ongoingEditionGuard: CanDeactivateFn<EditContactDetailsComponent> = (
  component: EditContactDetailsComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot
) => {
  const isEditing = component.isEditing;
  if (!isEditing) return true;

  return window.confirm(
    'You have unsaved changes. Do you really want to leave?'
  );
};

export const contactRoutes: Route[] = [
  {
    path: '',
    component: ContactPageComponent,
    children: [
      {
        path: 'edit',
        component: EditContactDetailsComponent,
        canDeactivate: [ongoingEditionGuard],
      },
      { path: '', component: ContactDetailsComponent },
    ],
  },
];
