import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../Services/get-api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  personas: any = [];

  constructor(private api: GetApiService, nav : NavController) { }

  ngOnInit() {
   
  }

  ionViewWillEnter(){
    this.obtenergente()
  }

  obtenergente(){
    this.api.obtenerpersonas().subscribe(
      (response) => { this.personas = response }, 
      (err) => console.log(err));
  }
}
