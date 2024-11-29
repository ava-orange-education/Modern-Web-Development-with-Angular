import { Component, NgModule } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { RouterModule, Routes, Router } from "@angular/router";

@Component({
  selector: "app-contact-page",
  template: `
    <h2>Contact Page</h2>
    <router-outlet />
  `,
})
class ContactPageComponent {}

@Component({
  selector: "app-contact-details",
  template: `<h2>Contact Details</h2>`,
})
class ContactDetailsComponent {}

@Component({
  selector: "app-edit-contact-details",
  template: `
    <h2>Contact Details</h2>
    <a routerLink="edit">Edit</a>
  `,
})
class EditContactDetailsComponent {}

@Component({
  selector: "app-home",
  template: `<h2>Home</h2>`,
})
class HomeComponent {}

@Component({
  selector: "app-not-found",
  template: `<h2>Not Found</h2>`,
})
class NotFoundComponent {}

@Component({
  selector: "app-component",
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

  constructor(private router: Router) {}

  goToContact(): void {
    this.router.navigate(["/contact", this.contactName]);
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

@NgModule({
  declarations: [
    AppComponent,
    ContactPageComponent,
    ContactDetailsComponent,
    EditContactDetailsComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [RouterModule.forRoot(routes)],
  bootstrap: [AppComponent],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
