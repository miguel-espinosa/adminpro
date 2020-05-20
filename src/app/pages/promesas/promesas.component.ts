import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';
import { promise } from 'protractor';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() {



    this.contarTres().then(
      () => console.log('Termino')
     )
     .catch( error => console.error('Error', error));

   }

  ngOnInit(): void {
  }

  contarTres(): Promise<boolean> {

    return new Promise( (resolve, reject) => {
      let contador = 0;

      let intervalo = setInterval( () => {
        contador += 1;
        console.log(contador);

        if ( contador === 3 ){
          resolve( true );
          // reject('Un error');
          clearInterval(intervalo);
        }
      }, 1000);

    });

  }

}
