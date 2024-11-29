import { Component, NgModule } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

@Component({
  selector: "app-component",
  template: ``,
})
class AppComponent {}

@NgModule({
  declarations: [AppComponent],
  imports: [],
  bootstrap: [AppComponent],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
