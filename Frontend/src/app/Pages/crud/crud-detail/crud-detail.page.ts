import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../Services/get-api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-crud-detail',
  templateUrl: './crud-detail.page.html',
  styleUrls: ['./crud-detail.page.scss'],
})
export class CrudDetailPage implements OnInit {

  idrecibido: string;
  persona: any = [];
  ramos: any = [];

  constructor(private api: GetApiService, private act: ActivatedRoute, private nav: Router, private alertCon : AlertController) { }

  ngOnInit() {
    this.obtenerpersona()
  }
  

  obtenerpersona() {
    this.act.paramMap.subscribe(Res => {
      this.idrecibido = Res.get('id');
      console.log(this.idrecibido);
      this.api.buscarpersonaporId(this.idrecibido).subscribe(
        (response) => { this.persona = response, console.log(response), console.log("objeto recibido") },
        (err) => console.log(err));
    }, (err) => console.log(err));
  }

  async BorrarUsuario() {
    const alert = await this.alertCon.create({
      header: 'Contraseña errada',
      message: 'Quiere Borrar al usuario?',
      buttons: [{
        text: 'Si',
        handler : () =>
        this.eliminarpersona()
        
        

      },'no'],
    });
    await alert.present();
  } 


  eliminarpersona() { 
    this.api.Eliminarpersonaporid(this.idrecibido).subscribe(Res => console.log(Res), (error => console.log(error)));
    this.nav.navigate(['/crud'])
  }
}