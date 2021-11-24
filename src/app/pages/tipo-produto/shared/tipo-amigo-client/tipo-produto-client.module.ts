import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoProdutoResolve } from './tipo-produto.resolve';
import { TipoProdutoClientService } from './tipo-produto-client.service';
import {TipoProdutoListResolve} from './tipo-produto-list.resolve';


/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    TipoProdutoClientService,
    TipoProdutoResolve,
    TipoProdutoListResolve
  ]
})
export class TipoProdutoClientModule { }
