import {NgModule} from '@angular/core';
import {NgxMaskModule} from 'ngx-mask';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../layouts/material.module';


import {OrderModule} from 'ngx-order-pipe';
import {TipoProdutoRoutes} from './tipo-produto.routing';
import {MessageModule} from '../../shared/message/message.module';
import {ValidationModule} from '../../shared/validation/validation.module';
import {TipoProdutoFormComponent} from './tipo-produto-form/tipo-produto-form.component';
import {TipoProdutoListComponent} from './tipo-produto-list/tipo-produto-list.component';
import { TipoProdutoClientModule } from './shared/tipo-amigo-client/tipo-produto-client.module';

import { DxChartModule, DxFunnelModule, DxPieChartModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    TipoProdutoFormComponent,
    TipoProdutoListComponent,
  ],
  entryComponents: [
  ],
  imports: [
    FormsModule,
    OrderModule,
    CommonModule,
    MessageModule,
    MaterialModule,
    ValidationModule,
    TipoProdutoClientModule,
    NgxMaskModule.forRoot({}),
    RouterModule.forChild(TipoProdutoRoutes),
    DxPieChartModule,
    DxChartModule,
    DxFunnelModule
  ]
})
export class TipoProdutoModule { }
