import { Component, NgModule } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { RouterModule, Routes } from "@angular/router";

@Component({
  selector: "app-contact-details",
  template: `<h2>Contact Details</h2>`,
})
class ContactDetailsComponent {}

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
    <router-outlet></router-outlet>
  `,
})
class AppComponent {}

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "contact/:username",
    component: ContactDetailsComponent,
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
    ContactDetailsComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [RouterModule.forRoot(routes)],
  bootstrap: [AppComponent],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
