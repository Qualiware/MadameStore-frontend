import { Routes } from "@angular/router";
import { SecurityGuard } from "../../shared/security/security.guard";
import { AdministracaoComponent } from "./administracao.component";
import { LayoutComponent } from "../../layouts/layout.component";

/**
 * Configuração de 'Rotas' do módulo 'Home'.
 *
 * @author Guiliano Rangel (UEG)
 */
export const AdministracaoRoutes: Routes = [
  {
    path: "administracao",
    component: LayoutComponent,
    canActivate: [SecurityGuard],
    data: {
      security: {
        roles: [
          "ROLE_GRUPO_INCLUIR",
          "ROLE_GRUPO_ALTERAR",
          "ROLE_GRUPO_PESQUISAR",
          "ROLE_GRUPO_VISUALIZAR",
          "ROLE_GRUPO_ATIVAR_INATIVAR",

          "ROLE_USUARIO_PESQUISAR",
          "ROLE_USUARIO_INCLUIR",
          "ROLE_USUARIO_VISUALIZAR",
          "ROLE_USUARIO_ATIVAR_INATIVAR",
          "ROLE_USUARIO_VINCULAR_GRUPO",
          "ROLE_AUDITORIA_PESQUISAR",
          "ROLE_PORTAL_AUDITORIA_EXPORTAR",

          "ROLE_TIPOAMIGO_INCLUIR",
          "ROLE_TIPOAMIGO_ALTERAR",
          "ROLE_TIPOAMIGO_PESQUISAR",
          "ROLE_TIPOAMIGO_VISUALIZAR",
          "ROLE_TIPOAMIGO_REMOVER",

          "ROLE_AMIGO_INCLUIR",
          "ROLE_AMIGO_ALTERAR",
          "ROLE_AMIGO_PESQUISAR",
          "ROLE_AMIGO_VISUALIZAR",
          "ROLE_AMIGO_REMOVER",
          "ROLE_AMIGO_STATUS",

          "ROLE_PRODUTO_INCLUIR",
          "ROLE_PRODUTO_ALTERAR",
          "ROLE_PRODUTO_PESQUISAR",
          "ROLE_PRODUTO_VISUALIZAR",
          "ROLE_PRODUTO_REMOVER",
          "ROLE_PRODUTO_STATUS",

          "ROLE_TIPOPRODUTO_INCLUIR",
          "ROLE_TIPOPRODUTO_ALTERAR",
          "ROLE_TIPOPRODUTO_PESQUISAR",
          "ROLE_TIPOPRODUTO_VISUALIZAR",
          "ROLE_TIPOPRODUTO_REMOVER",
          "ROLE_TIPOPRODUTO_STATUS",

          "ROLE_VENDA_INCLUIR",
          "ROLE_VENDA_ALTERAR",
          "ROLE_VENDA_PESQUISAR",
          "ROLE_VENDA_VISUALIZAR",
          "ROLE_VENDA_REMOVER",
          "ROLE_VENDA_STATUS",

          "ROLE_CLIENTE_INCLUIR",
          "ROLE_CLIENTE_ALTERAR",
          "ROLE_CLIENTE_PESQUISAR",
          "ROLE_CLIENTE_VISUALIZAR",
          "ROLE_CLIENTE_REMOVER",
        ],
      },
    },
    children: [
      {
        path: "",
        component: AdministracaoComponent,
      },
      {
        path: "grupo",
        loadChildren: () =>
          import("../grupo/grupo.module").then((m) => m.GrupoModule),
      },
      {
        path: "usuario",
        loadChildren: () =>
          import("./../usuario/usuario.module").then((m) => m.UsuarioModule),
      },
      {
        path: "tipo-amigo",
        loadChildren: () =>
          import("../tipo-amigo/tipo-amigo.module").then(
            (m) => m.TipoAmigoModule
          ),
      },
      {
        path: "amigo",
        loadChildren: () =>
          import("../amigo/amigo.module").then((m) => m.AmigoModule),
      },
      {
        path: "tipo-produto",
        loadChildren: () =>
          import("../tipo-produto/tipo-produto.module").then(
            (m) => m.TipoProdutoModule
          ),
      },
      {
        path: "produto",
        loadChildren: () =>
          import("../produto/produto.module").then((m) => m.ProdutoModule),
      },
       {
        path: "mensagem",
        loadChildren: () =>
          import("../mensagem/mensagem.module").then((m) => m.MensagemModule),
      },
      {
        path: "venda",
        loadChildren: () =>
          import("../venda/venda.module").then((m) => m.VendaModule),
      },
      {
        path: "cliente",
        loadChildren: () =>
          import("../cliente/cliente.module").then((m) => m.ClienteModule),
      },
    ],
  },
];
