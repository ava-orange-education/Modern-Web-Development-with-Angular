import { Component, Input } from "@angular/core";

interface User {
  name: string;
}

@Component({
  selector: "app-login",
  standalone: true,
  template: `
    @if (currentUser === null) {
    <button>Login</button>
    } @else {
    <button>Logout</button>
    }
  `,
})
export class LoginComponent {
  currentUser: User | null = null;
}

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [LoginComponent],
  template: `
    <nav>
      <app-login />
    </nav>
  `,
})
export class NavbarComponent {}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [NavbarComponent],
  template: `<app-navbar />`,
})
export class AppComponent {}
