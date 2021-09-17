/* tslint:disable:no-redundant-jsdoc */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import { MessageService } from 'src/app/shared/message/message.service';
import { VendaClientService } from './venda-client.service';

/**
 * Classe resolve responsável pela busca das informações de Venda conforme o id.
 *
 * @author Guiliano Rangel (UEG)
 */
@Injectable()
export class VendaResolve implements Resolve<any> {

  /**
   * Construtor da classe.
   *
   * @param router
   * @param vendaClientService
   * @param messageService
   */
  constructor(
    private router: Router,
    private vendaClientService: VendaClientService,
    private messageService: MessageService
  ) { }

  /**
   * Realiza a consulta por id de Venda.
   *
   * @param route
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.params.id;

    return new Observable(observer => {
      this.vendaClientService.getById(id).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        },
        error => {
          observer.error(error);
          this.router.navigate(['']);
          this.messageService.addMsgDanger(error);
        }
      );
    });
  }
}
