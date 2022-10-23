import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudPage } from './crud.page';

const routes: Routes = [
  {
    path: '',
    component: CrudPage
  },
  {
    path: 'crud-detail',
    loadChildren: () => import('../../Pages/crud/crud-detail/crud-detail.module').then( m => m.CrudDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudPageRoutingModule {}
