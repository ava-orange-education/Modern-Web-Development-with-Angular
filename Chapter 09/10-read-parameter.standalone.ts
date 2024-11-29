import { Component, Input, inject } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Routes,
  provideRouter,
  withComponentInputBinding,
} from "@angular/router";

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

@Component({
  selector: "app-home",
  standalone: true,
  imports: [],
  template: `<h2>Home</h2>`,
})
class HomeComponent {}

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [],
  template: `<h2>Not Found</h2>`,
})
class NotFoundComponent {}

@Component({
  selector: "app-component",
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h1>Angular Routing</h1>

    <nav>
      <ul>
        <li>
          <a
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            Home
          </a>
        </li>
        <li>
          <a [routerLink]="['/contact', contactName]" routerLinkActive="active">
            {{ contactName }}
          </a>
        </li>
      </ul>
    </nav>

    <button (click)="goToContact()">Go To Contact</button>

    <router-outlet />
  `,
  styles: [".active { color: red }"],
})
class AppComponent {
  readonly contactName = "JohnDoe";

  readonly #router = inject(Router);

  goToContact(): void {
    this.#router.navigate(["/contact", this.contactName]);
  }
}

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "contact/:username",
    component: ContactPageComponent,
    children: [
      { path: "edit", component: EditContactDetailsComponent },
      { path: "", component: ContactDetailsComponent },
    ],
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/home",
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes, withComponentInputBinding())],
});
