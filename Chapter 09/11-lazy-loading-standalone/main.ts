import { Component, inject } from "@angular/core";
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
    loadChildren: async () => (await import("./lazy-loaded")).contactRoutes,
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
