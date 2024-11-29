import { Component, Input } from "@angular/core";
import { RouterLink, RouterOutlet, Routes } from "@angular/router";

@Component({
  selector: "app-contact-page",
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h2>{{ username }}'s Contact Page</h2>
    <router-outlet />
  `,
})
class ContactPageComponent {
  @Input() username: string = "";
}

@Component({
  selector: "app-contact-details",
  standalone: true,
  imports: [RouterLink],
  template: `
    <h2>Contact Details</h2>
    <a routerLink="edit">Edit</a>
  `,
})
class ContactDetailsComponent {}

@Component({
  selector: "app-edit-contact-details",
  standalone: true,
  imports: [],
  template: `<h2>Edit Contact Details</h2>`,
})
class EditContactDetailsComponent {}

export const contactRoutes: Routes = [
  {
    path: "",
    component: ContactPageComponent,
    children: [
      { path: "edit", component: EditContactDetailsComponent },
      { path: "", component: ContactDetailsComponent },
    ],
  },
];
