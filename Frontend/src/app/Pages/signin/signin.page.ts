import { Component, OnInit } from '@angular/core';
import { GetApiService } from 'src/app/Services/get-api.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  personas: any = [];


  nombreusuario: string = "";
  rut: string = "";
  nombre1: string = "";
  nombre2: string = "";
  apellido1: string = "";
  apellido2: string = "";
  correo: string = "";
  contrasena: string = "";
  contrasena2: string = "";
  urlfoto: string = "";
  descripcion: string = "";
  tipousuarioId: string = "alumno";


  constructor(private api: GetApiService, public alertCon: AlertController) { }



  ngOnInit() {
    this.buscarGente()
  }


  guardarUsuario() {
    var existe = false;

    if (!this.nombreusuario.length || !this.rut.length || !this.nombre1.length || !this.nombre2.length || !this.apellido1.length || !this.apellido2.length || !this.correo.length || !this.contrasena.length || !this.urlfoto.length || !this.descripcion.length || !this.tipousuarioId.length) {
      this.Vacio()
      console.log("el formulario esta incompleto")
    } else {
      if (this.contrasena === this.contrasena2) {
        console.log("las contraseñas Coinciden");


        for (let index = 0; index < this.personas.length; index++) {
          console.log(this.personas[index])
          if (String(this.correo).toLocaleLowerCase() !== String(this.personas[index].correo).toLocaleLowerCase()) {
            this.api.crearPersona(this.nombreusuario, this.rut, this.nombre1, this.nombre2, this.apellido1, this.apellido2, this.correo, this.contrasena, this.urlfoto, this.descripcion, this.tipousuarioId
              ).subscribe(response => { console.log(response) }, err => console.log(err))
            break;
          }
        }
  
      }
      else {
        console.log("las contraseñas no coincidieron")
        this.contrasenasNop()
      }
    }
  }


  buscarGente() {
    this.api.obtenerpersonas().subscribe(
      response => {
        this.personas = response, console.log(this.personas)
      }, err => console.log(err));
  }




  validarRut(rut) {                    //v2.1 mejorada y re hecha para typescript
    var valor = rut.value.replace('.', '');
    valor = valor.replace('-', '');
    var cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).UpperCase();
    rut.value = cuerpo + '-' + dv
    if (cuerpo.length < 7) {
      this.rutincompleto();
      return false;
    }

    let suma = 0;
    let multiplo = 2;

    for (let i = 1; i <= cuerpo.length; i++) {
      let index = multiplo * valor.charAt(cuerpo.length - i);
      suma = suma + index;
      if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    }
    let dvEsperado = 11 - (suma % 11);

    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;
    if (dvEsperado != dv) {
      this.rutinvalido()
      return false;
    }
    else {
      return true;
    }
  }


  async rutincompleto() {
    const alert = await this.alertCon.create({
      header: 'Rut incompleto',
      message: 'Su rut está incompleto, pongale mas caracteres',
      buttons: ['intentar denuevo'],
    });
    await alert.present();
  }

  async contrasenasNop() {
    const alert = await this.alertCon.create({
      header: 'Las contraseñas no coinciden',
      message: 'haga coincidir las contraseñas por favor',
      buttons: ['intentar denuevo'],
    });
    await alert.present();
  }
  async rutinvalido() {
    const alert = await this.alertCon.create({
      header: 'Rut inválido',
      message: 'Su rut no es valido, intente denuevo',
      buttons: ['intentar denuevo'],
    });
    await alert.present();
  }

  async Vacio() {
    const alert = await this.alertCon.create({
      header: 'Falta llenar datos en el formulario',
      message: 'Termine de llenar el formulario, por favor',
      buttons: ['intentar denuevo'],
    });
    await alert.present();
  }
}
