import { Component, Injectable, Input, inject } from '@angular/core';
import {
  RouterLink,
  RouterOutlet,
  Route,
  CanDeactivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h2>{{ username }}'s Contact Page</h2>

    <p>Name: {{ contact.name }}</p>
    <p>Address: {{ contact.email }}</p>

    <router-outlet />
  `,
})
class ContactPageComponent {
  @Input() username: string = '';
  @Input() contact!: Contact;
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

interface Contact {
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  getContactByName(name: string): Contact {
    return { name, email: `${name}@example.com` };
  }
}

const contactResolver: ResolveFn<Contact> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const contactName = route.paramMap.get('username')!;

  const contactService = inject(ContactService);
  return contactService.getContactByName(contactName);
};

export const contactRoutes: Route[] = [
  {
    path: '',
    component: ContactPageComponent,
    resolve: {
      contact: contactResolver,
    },
    children: [
      {
        path: 'edit',
        component: EditContactDetailsComponent,
        canDeactivate: [ongoingEditionGuard],
      },
      {
        path: '',
        component: ContactDetailsComponent,
      },
    ],
  },
];
