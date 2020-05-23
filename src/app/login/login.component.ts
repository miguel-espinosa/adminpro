import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';
import { element, promise } from 'protractor';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(
          public router: Router,
          public _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInt();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ){
      this.recuerdame = true;
    }

  }

  googleInt(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '20690273984-1us2v3q07vblfbn9dmtu7o8iqg5h7v72.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });
  }

  attachSignin( element ){

    this.auth2.attachClickHandler( element, {} , (googleUser) =>{
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle( token )
      .subscribe( () => window.location.href = '#/dashboard' );
    });

  }

  ingresar( forma: NgForm){

    if (forma.invalid){
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
              .subscribe( correcto => this.router.navigate(['/dashboard']) );
  }

}
