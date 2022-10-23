import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  {
    path: 'crud',
    loadChildren: () => import('./Pages/crud/crud.module').then( m => m.CrudPageModule)
  },
  {
    path: 'detalles/:id',
    loadChildren: () => import('./Pages/crud/crud-detail/crud-detail.module').then( m => m.CrudDetailPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./Pages/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./Pages/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'totalregistro',
    loadChildren: () => import('./Pages/totalregistro/totalregistro.module').then( m => m.TotalregistroPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./Pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
