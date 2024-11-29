import { Component, NgModule } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { RouterModule, Routes } from "@angular/router";

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
  template: `<h2>Edit Contact Details</h2>`,
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
