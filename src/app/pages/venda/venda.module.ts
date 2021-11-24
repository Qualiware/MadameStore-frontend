import { ItemVendaClientResolve } from './../../shared/services/item-venda-client/item-venda-client.resolve';

import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../layouts/material.module';


import { OrderModule } from 'ngx-order-pipe';
import { VendaRoutes } from './venda.routing';
import { MessageModule } from '../../shared/message/message.module';
import { ValidationModule } from '../../shared/validation/validation.module';
import { VendaFormComponent } from './venda-form/venda-form.component';
import { VendaListComponent } from './venda-list/venda-list.component';
import { VendaClientModule } from './shared/venda-client/venda-client.module';
import { ItemVendaClientService } from 'src/app/shared/services/item-venda-client/item-venda-client.service';




@NgModule({
  declarations: [
    VendaFormComponent,
    VendaListComponent,

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
    VendaClientModule,
    NgxMaskModule.forRoot({}),
    RouterModule.forChild(VendaRoutes),


  ],
  providers: [ItemVendaClientService, ItemVendaClientResolve],
})
export class VendaModule { }
