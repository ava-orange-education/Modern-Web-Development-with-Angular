{
  path: "admin",
  loadChildren: await () => 
    (async import('./admin-feature/route')).then(m => m.adminRoutes),
}
