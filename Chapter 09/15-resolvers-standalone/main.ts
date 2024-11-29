import { Component, Injectable, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  RouterStateSnapshot,
  Routes,
  UrlSegment,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `<h2>Home</h2>`,
})
class HomeComponent {}

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  template: `<h2>Not Found</h2>`,
})
class NotFoundComponent {}

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
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
  styles: ['.active { color: red }'],
})
class AppComponent {
  readonly contactName = 'JohnDoe';

  readonly #router = inject(Router);

  goToContact(): void {
    this.#router.navigate(['/contact', this.contactName]);
  }
}

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  currentUser = { canAccessContacts: true };
}

const loggedInGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const currentUser = inject(CurrentUserService).currentUser;

  const isUserLoggedIn = currentUser !== null;
  if (isUserLoggedIn) return true;

  const router = inject(Router);
  return router.createUrlTree(['/login']);
};

const adminGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const currentUser = inject(CurrentUserService).currentUser;
  return currentUser?.canAccessContacts === true;
};

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'contact/:username',
    canMatch: [adminGuard],
    loadChildren: async () => (await import('./lazy-loaded')).contactRoutes,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes, withComponentInputBinding())],
});
