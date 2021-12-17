
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import { ProdutoListResolve } from '../../produto/shared/produto-client/produto-list.resolve';
import { MensagemClientService } from './mensagem-client.service';
import { MensagemResolve } from './mensagem.resolve';
import { MensagemListResolve } from './mensagem-list.resolve';

/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    MensagemClientService,
    MensagemResolve,
    MensagemListResolve,
    ProdutoListResolve
  ]
})
export class MensagemClientModule { }
