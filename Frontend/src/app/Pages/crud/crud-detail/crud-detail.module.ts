import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudDetailPageRoutingModule } from './crud-detail-routing.module';

import { CrudDetailPage } from './crud-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudDetailPageRoutingModule
  ],
  declarations: [CrudDetailPage]
})
export class CrudDetailPageModule {}
