import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})



export class GetApiService {

  Persona = [
  ]

  APIpersonas = "http://localhost:3000/Personas/"
  APItipo = "http://localhost:3000/Personas"
  
  constructor( private http : HttpClient) { }


  obtenerpersonas() { 
    return this.http.get(this.APIpersonas);
  }
  buscarpersonaporId(id: String){
    return this.http.get(this.APIpersonas + id)
  }
  


  Eliminarpersonaporid(id: String){
    console.log(this.APIpersonas + id)
    return this.http.delete(this.APIpersonas + id)
  }
  crearPersona(
    username:any,
    rut:any,
    nombre1:any,
    nombre2:any,
    apellido1:any,
    apellido2:any,
    correo:any,
    contrasena:any,
    urlfoto:any,
    desc:any,
    tipopersona:any){
    return this.http.post(this.APIpersonas,{username,rut,nombre1,nombre2,apellido1,apellido2,correo,contrasena,urlfoto,desc,tipopersona})
  }

  crearPersonaprofesor(username,rut,nombre1,nombre2,apellido1,apellido2,correo,contrasena,urlfoto,desc, tipopersona){
    return this.http.post(this.APIpersonas,{username,rut,nombre1,nombre2,apellido1,apellido2,correo,contrasena,urlfoto,desc,tipopersona})
  }

  actualizarPersonaPorId(){}




}
