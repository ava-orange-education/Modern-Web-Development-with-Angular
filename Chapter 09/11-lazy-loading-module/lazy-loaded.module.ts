import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-contact-page',
  template: `
    <h2>{{ username$ | async }}'s Contact Page</h2>
    <router-outlet />
  `,
})
class ContactPageComponent {
  username$ = this.activatedRoute.paramMap.pipe(
    map((params) => params.get('username'))
  );

  constructor(private readonly activatedRoute: ActivatedRoute) {}
}

@Component({
  selector: 'app-contact-details',
  template: `
    <h2>Contact Details</h2>
    <a routerLink="edit">Edit</a>
  `,
})
class ContactDetailsComponent {}

@Component({
  selector: 'app-edit-contact-details',
  template: `<h2>Edit Contact Details</h2>`,
})
class EditContactDetailsComponent {}

@NgModule({
  declarations: [
    ContactPageComponent,
    EditContactDetailsComponent,
    ContactDetailsComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ContactPageComponent,
        children: [
          { path: 'edit', component: EditContactDetailsComponent },
          { path: '', component: ContactDetailsComponent },
        ],
      },
    ]),
  ],
})
export class ContactModule {}
