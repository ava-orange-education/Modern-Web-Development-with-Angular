import { Component, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Router, RouterModule, Routes } from "@angular/router";

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

  constructor(private readonly router: Router) {}

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
    loadChildren: async () =>
      (await import("./lazy-loaded.module")).ContactModule,
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

const routes: Routes = [
  {
    path: "dashboard",
    children: [
      {
        path: "admin",
        component: AdminDashboardComponent,
      },
      {
        path: "",
        component: UserDashboardComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent],

  imports: [BrowserModule, RouterModule.forRoot(routes)],
  bootstrap: [AppComponent],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
