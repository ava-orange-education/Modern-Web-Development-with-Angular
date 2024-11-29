import { Component, EventEmitter, Input, Output } from "@angular/core";

interface User {
  name: string;
}

@Component({
  selector: "app-login",
  standalone: true,
  template: `
    @if (currentUser === null) {
    <button (click)="loggedIn.emit({ name: 'John' })">Login</button>
    } @else {
    <button (click)="loggedOut.emit()">Logout</button>
    }
  `,
})
export class LoginComponent {
  @Input() currentUser: User | null = null;

  @Output() loggedIn = new EventEmitter<User | null>();
  @Output() loggedOut = new EventEmitter<void>();
}

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [LoginComponent],
  template: `
    <nav>
      <app-login
        [currentUser]="currentUser"
        (loggedIn)="onLoggedIn($event)"
        (loggedOut)="onLoggedOut()"
      />
    </nav>
  `,
})
export class NavbarComponent {
  currentUser: User | null = null;

  onLoggedIn(user: User | null): void {
    this.currentUser = user;
  }

  onLoggedOut(): void {
    this.currentUser = null;
  }
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [NavbarComponent],
  template: `<app-navbar />`,
})
export class AppComponent {}
