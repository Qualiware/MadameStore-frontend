import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VendaResolve} from './venda.resolve';
import {VendaClientService} from './venda-client.service';

import {VendaListResolve} from './venda-list.resolve';

/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    VendaClientService,
    VendaResolve,
    VendaListResolve
  ]
})
export class VendaClientModule { }
