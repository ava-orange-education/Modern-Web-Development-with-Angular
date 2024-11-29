const loggedInGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const currentUser = inject(CurrentUserService).currentUser;

  const isUserLoggedIn = currentUser !== null;
  if (isUserLoggedIn) return true;

  const router = inject(Router);
  return router.createUrlTree(["/login"]);
};

const routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
];
