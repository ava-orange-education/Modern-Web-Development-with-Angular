import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouterOutlet, Routes, provideRouter } from "@angular/router";

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

const routes: Routes = [];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
