import {Routes} from '@angular/router';
import {SecurityGuard} from '../../shared/security/security.guard';
import { TipoProdutoListResolve } from '../tipo-produto/shared/tipo-amigo-client/tipo-produto-list.resolve';


import {ProdutoFormComponent} from './produto-form/produto-form.component';
import {ProdutoListComponent} from './produto-list/produto-list.component';
import { ProdutoListResolve } from './shared/produto-client/produto-list.resolve';
import { ProdutoResolve } from './shared/produto-client/produto.resolve';



/**
 * Configurações de rota de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
export const UsuarioRoutes: Routes = [
  {
    path: 'incluir',
    component: ProdutoFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'incluir',
      security: {
        roles: [
          'ROLE_PRODUTO_INCLUIR'
        ]
      }
    },
    resolve: {
      tipoProdutos: TipoProdutoListResolve
    }
  },
  {
    path: 'listar',
    component: ProdutoListComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      security: {
        roles: [
          'ROLE_PRODUTO_PESQUISAR'
        ]
      }
    },
    resolve: {
      tipoProdutos: TipoProdutoListResolve,
      produtos: ProdutoListResolve
    }
  },
  {
    path: ':id/alterar',
    component: ProdutoFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'alterar',
      security: {
        roles: [
          'ROLE_PRODUTO_ALTERAR'
        ]
      }
    },
    resolve: {
      produto: ProdutoResolve,
      tipoProdutos: TipoProdutoListResolve
    }
  },
  {
    path: ':id/visualizar',
    component: ProdutoFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
      security: {
        roles: [
          'ROLE_USUARIO_VISUALIZAR'
        ]
      }
    },
    resolve: {
      produto: ProdutoResolve,
      tipoProdutos: TipoProdutoListResolve
    }
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];
