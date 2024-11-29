import { Component, NgModule } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { RouterModule, Routes } from "@angular/router";

@Component({
  selector: "app-home",
  template: `<h2>Home</h2>`,
})
class HomeComponent {}

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
];

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [RouterModule.forRoot(routes)],
  bootstrap: [AppComponent],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
