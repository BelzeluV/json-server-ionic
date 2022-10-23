import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TotalregistroPageRoutingModule } from './totalregistro-routing.module';

import { TotalregistroPage } from './totalregistro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TotalregistroPageRoutingModule
  ],
  declarations: [TotalregistroPage]
})
export class TotalregistroPageModule {}
