import { Routes } from '@angular/router';

import { SecurityGuard } from '../../shared/security/security.guard';
import { TipoProdutoListResolve } from './shared/tipo-amigo-client/tipo-produto-list.resolve';
import { TipoProdutoResolve } from './shared/tipo-amigo-client/tipo-produto.resolve';
import { TipoProdutoFormComponent } from './tipo-produto-form/tipo-produto-form.component';
import { TipoProdutoListComponent } from './tipo-produto-list/tipo-produto-list.component';


/**
 * Configurações de rota de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
export const TipoProdutoRoutes: Routes = [
  {
    path: 'incluir',
    component: TipoProdutoFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'incluir',
      security: {
        roles: [
          'ROLE_TIPOPRODUTO_INCLUIR'
        ]
      }
    },
  },
  {
    path: 'listar',
    component: TipoProdutoListComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      security: {
        roles: [
          'ROLE_TIPOPRODUTO_PESQUISAR'
        ]
      }
    },
    resolve: {
      tipoprodutos: TipoProdutoListResolve,
    }
  },
  {
    path: ':id/alterar',
    component: TipoProdutoFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'alterar',
      security: {
        roles: [
          'ROLE_TIPOPRODUTO_ALTERAR'
        ]
      }
    },
    resolve: {
      tipoProduto: TipoProdutoResolve,
    }
  },
  {
    path: ':id/visualizar',
    component: TipoProdutoFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
      security: {
        roles: [
          'ROLE_TIPOPRODUTO_VISUALIZAR'
        ]
      }
    },
    resolve: {
      tipoProduto: TipoProdutoResolve
    }
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];
