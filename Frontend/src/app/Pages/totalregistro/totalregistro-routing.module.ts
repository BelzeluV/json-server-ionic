import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TotalregistroPage } from './totalregistro.page';

const routes: Routes = [
  {
    path: '',
    component: TotalregistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TotalregistroPageRoutingModule {}
