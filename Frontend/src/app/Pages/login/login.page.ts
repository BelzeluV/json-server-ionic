import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GetApiService } from 'src/app/Services/get-api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  personas: any = [];
  constructor(private nav: Router, private alertCon: AlertController, private api: GetApiService) { }

  ngOnInit() {
    this.buscarGente()
  }

  CambioMenuprincipal(correo, contrasena) {
    let contracorrecta = false;
    let correocorrecto;
    let id_user 
    if (correo.value == "" || contrasena.value == "") {
      this.datosVacios()
    }
    else {
    
      for (let index = 0; index < this.personas.length; index++) {
        
        if (String(correo.value).toLocaleLowerCase() === String(this.personas[index].correo).toLocaleLowerCase()) {
          console.log("el correo está bien")
          correocorrecto = true;
          if (contrasena.value === String(this.personas[index].contrasena)) {
            console.log("la contraseña esta bien tambien")
            contracorrecta = true;
            id_user = String(this.personas[index].id)
            this.nav.navigate(['/home'])
          }
          else {
            console.log("contraseña erronea")
            this.contramala()
          }
        }
      }
      if (correocorrecto == false) {
        this.correoNoCreado()
      }
    }
  }
  
  Cambioregistrar() {
    this.nav.navigate(['/signin'])
  }
  async contramala() {
    const alert = await this.alertCon.create({
      header: 'Contraseña errada',
      message: 'Su Contraseña está erronea!',
      buttons: ['intentar denuevo'],
    });
    await alert.present();
  }
  async datosVacios() {
    const alert = await this.alertCon.create({
      header: 'Falta informacion',
      message: 'Le faltan datos por llenar, por favor llene el formulario, no es tan dificil',
      buttons: ['intentar denuevo'],
    });
    await alert.present();
  }
  async correoNoCreado() {
    const alert = await this.alertCon.create({
      header: 'No existe',
      message: 'Su correo no está registrado, si quiere crear una cuenta debe pulsar el boton crear cuenta de la pagina anterior',
      buttons: ['volver'],
    });
    await alert.present();
  }
  buscarGente() {
    this.api.obtenerpersonas().subscribe(
      response => {
        this.personas = response, console.log(this.personas)
      }, err => console.log(err));
  }

}
