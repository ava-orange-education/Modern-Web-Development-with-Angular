import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouterOutlet, Routes, provideRouter } from "@angular/router";

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
  imports: [RouterOutlet],
  template: `
    <h1>Angular Routing</h1>
    <router-outlet />
  `,
})
class AppComponent {}

const routes: Routes = [
  {
    path: "home",
    title: () => `Homepage at ${new Date().toISOString()}`,
    component: HomeComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
