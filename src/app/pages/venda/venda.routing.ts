import { ClienteListResolve } from './../cliente/shared/cliente-client/cliente-list.resolve';
import { ItemVendaClientResolve } from './../../shared/services/item-venda-client/item-venda-client.resolve';
import {Routes} from '@angular/router';
import {SecurityGuard} from '../../shared/security/security.guard';

import {VendaFormComponent} from './venda-form/venda-form.component';
import {VendaListComponent} from './venda-list/venda-list.component';
import { VendaListResolve } from './shared/venda-client/venda-list.resolve';
import { VendaResolve } from './shared/venda-client/venda.resolve';



/**
 * Configurações de rota de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
export const VendaRoutes: Routes = [
  {
    path: 'incluir',
    component: VendaFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'incluir',
      security: {
        roles: [
          'ROLE_VENDA_INCLUIR'
        ]
      }
    },
    resolve: {

      clientes: ClienteListResolve
    }
  },
  {
    path: 'listar',
    component: VendaListComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      security: {
        roles: [
          'ROLE_VENDA_PESQUISAR'
        ]
      }
    },
    resolve: {
      vendas: VendaListResolve,
      itemVenda: ItemVendaClientResolve,
      clientes: ClienteListResolve
    }
  },
  {
    path: ':id/alterar',
    component: VendaFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'alterar',
      security: {
        roles: [
          'ROLE_VENDA_ALTERAR'
        ]
      }
    },
    resolve: {
      venda: VendaResolve,
      itemVenda: ItemVendaClientResolve,
      clientes: ClienteListResolve
    }
  },
  {
    path: ':id/visualizar',
    component: VendaFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
      security: {
        roles: [
          'ROLE_VENDA_VISUALIZAR'
        ]
      }
    },
    resolve: {
      venda: VendaResolve,
      itemVenda: ItemVendaClientResolve,
      clientes: ClienteListResolve
    }
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  },
  {
    path: 'cssalterar',
    component: VendaFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'incluir',
      security: {
        roles: [
          'ROLE_VENDA_INCLUIR'
        ]
      }
    },
    resolve: {

      clientes: ClienteListResolve
    }
  }
];
