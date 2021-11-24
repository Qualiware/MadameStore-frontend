/* tslint:disable:no-redundant-jsdoc */
import {Observable} from 'rxjs';
<<<<<<< HEAD
import {Injectable, SystemJsNgModuleLoader} from '@angular/core';
=======
import {Injectable} from '@angular/core';
>>>>>>> 4ee0625b4227de64aed867634b7d78fd0d43ef70
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';

import {MessageService} from 'src/app/shared/message/message.service';
import {VendaClientService} from './venda-client.service';
import { FiltroVendaDTO } from '../../../../shared/dto/filtro-venda.dto';

/**
 * Classe resolve responsável pela busca das informações de Usuário conforme o id.
 *
 * @author Guiliano Rangel (UEG)
 */
@Injectable()
export class VendaListResolve implements Resolve<any> {

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
   * Realiza a consulta por id de Usuário.
   *
   * @param route
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.params.id;

    return new Observable(observer => {
      const filtro: FiltroVendaDTO = new FiltroVendaDTO();
<<<<<<< HEAD
      filtro.dataVenda = "2000/01/12";

=======
      filtro.dataVenda = '%%%%';
>>>>>>> 4ee0625b4227de64aed867634b7d78fd0d43ef70
      this.vendaClientService.getByFiltro(filtro).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        },
        error => {
          if (error.status === 404) {
            observer.next();
            observer.complete();
          } else {
            observer.error(error);
            this.router.navigate(['']);
            this.messageService.addMsgDanger(error);
          }
        }
      );
    });
  }
}
