import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrupoResolve } from './grupo.resolve';
import { GrupoClientService } from './grupo-client.service';
import { GruposAtivosResolve } from './grupos-ativos.resolve';


/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    GrupoClientService,
    GruposAtivosResolve,
    GrupoResolve
  ]
})
export class GrupoClientModule { }
