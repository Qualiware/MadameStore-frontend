/* tslint:disable:no-redundant-jsdoc */
import { NgForm } from "@angular/forms";
import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { MessageService } from "../../../shared/message/message.service";
import { AcaoSistema } from "../../../shared/component/acao-sistema.acao";
import { SecurityService } from "../../../shared/security/security.service";
import { VendaClientService } from "../shared/venda-client/venda-client.service";
import { GrupoClientService } from "../../grupo/shared/grupo-client/grupo-client.service";

/**
 * Componente de formulário de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: "app-venda-form",
  templateUrl: "./venda-form.component.html",
  styleUrls: ["./venda-form.component.scss"],
})
export class VendaFormComponent {
  public acaoSistema: AcaoSistema;

  public venda: any;
  public telefonesVenda: any[];
  public grupoInclusao: any;
  public gruposVinculados: any[];
  public grupos: any[];
  public submittedVenda: boolean;
  public submittedGrupo: boolean;

  private dialogRef: MatDialogRef<any>;

  public dataSourceGrupos: MatTableDataSource<any>;

  public displayedColumns: any;

  @ViewChild("formVenda", { static: true }) formVenda: NgForm;
  @ViewChild("formGrupo", { static: true }) formGrupo: NgForm;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param dialog
   * @param messageService
   * @param securityService
   * @param grupoClientService
   * @param vendaClientService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    public securityService: SecurityService,
    private grupoClientService: GrupoClientService,
    private vendaClientService: VendaClientService
  ) {
    this.acaoSistema = new AcaoSistema(route);
    this.dataSourceGrupos = new MatTableDataSource<any>();

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.displayedColumns = ["nomeGrupoVinculado"];
    } else {
      this.displayedColumns = ["nomeGrupoVinculado", "remover"];
    }

    if (this.acaoSistema.isAcaoIncluir()) {
      this.telefonesVenda = [];
      this.grupoInclusao = {};
      this.gruposVinculados = [];
      this.dataSourceGrupos.data = this.gruposVinculados;
      this.carregarGrupos();

      // Inicializa o Usuário para Inclusão
      this.venda = {
        grupos: [],
      };
    }

    if (this.acaoSistema.isAcaoAlterar()) {
      this.grupoInclusao = {};
      this.carregarGrupos();
    }

    if (
      this.acaoSistema.isAcaoAlterar() ||
      this.acaoSistema.isAcaoVisualizar()
    ) {
      this.venda = route.snapshot.data.venda;
      this.telefonesVenda = this.venda.telefones;
      this.gruposVinculados = this.venda.grupos;
      this.dataSourceGrupos.data = this.gruposVinculados;
    }
  }

  /**
   * Carrega os Grupos pelo id do Sistema.
   *
   * @param idSistema
   */
  public carregarGrupos(): void {
    this.grupoClientService.getGruposAtivos().subscribe(
      (data) => {
        this.grupos = data;
      },
      (error) => {
        this.grupos = undefined;
        if (error.code !== "ME003") {
          this.messageService.addMsgDanger(error);
        }
      }
    );
    delete this.grupoInclusao.grupo;
  }

  /**
   * Adicionar o Grupo à lista de Grupos do Usuário.
   *
   * @param grupoInclusao
   * @param form
   * @param event
   */
  public adicionarGrupo(grupoInclusao: any, form: NgForm, event: any): void {
    form.onSubmit(event);
    this.submittedGrupo = true;

    if (form.valid) {
      // Busca o Grupo a ser adicionado na lista
      const grupoVinculado = this.gruposVinculados.find(
        (grupo) => grupo.idGrupo === grupoInclusao.grupo.id
      );

      // Verifica se o Grupo foi encontrado
      if (grupoVinculado === undefined) {
        this.gruposVinculados.push({
          idVenda: this.venda.id,
          idGrupo: grupoInclusao.grupo.id,
          nomeGrupo: grupoInclusao.grupo.nome,
          nomeSistemaGrupo: grupoInclusao.grupo.nomeSistema,
        });
        this.dataSourceGrupos.data = this.gruposVinculados;
        form.onReset();
        this.grupoInclusao = {};
      } else {
        this.messageService.addMsgDanger("MSG011");
      }
    }
  }

  /**
   * Remove o Grupo da lista de grupos do Usuário.
   *
   * @param grupo
   */
  public removerGrupo(grupo: any) {
    this.messageService.addConfirmYesNo("MSG006", () => {
      const index = this.gruposVinculados.indexOf(grupo);
      this.gruposVinculados.splice(index, 1);
      this.dataSourceGrupos.data = this.gruposVinculados;
      this.messageService.addMsgSuccess("MSG007");
    });
  }

  /**
   * Salva a instância de Usuário.
   *
   * @param venda
   * @param form
   * @param event
   */
  public salvar(venda: any, form: NgForm, event: any) {
    form.onSubmit(event);
    this.submittedVenda = true;

    if (form.valid) {
      if (this.gruposVinculados.length > 0) {
        venda.grupos = this.gruposVinculados;
        venda.telefones = this.telefonesVenda;

        this.vendaClientService.salvar(venda).subscribe(
          () => {
            this.router.navigate(["/administracao/venda"]);
            this.messageService.addMsgSuccess("MSG007");
          },
          (error) => {
            this.messageService.addMsgDanger(error);
          }
        );
      } else {
        this.messageService.addMsgSuccess("MSG039");
      }
    } else {
      this.messageService.addMsgSuccess("MSG001");
    }
  }

  /**
   * Atualiza o Tipo de Usuário.
   *
   * @param event
   */
  public atualizarTipoVenda(event: any): void {
    this.venda.tipo = event.value;
  }

  /**
   * Altera o status do Usuário informado.
   *
   * @param venda
   */

  /**
   * Ativa o Usuário informado.
   *
   * @param venda
   */

  /**
   * Inativa o Usuário informado.
   *
   * @param venda
   */

  /**
   * Confirma o cancelamento e volta para a tela de Pesquisa.
   */
  public cancelar(): void {
    let confirmed = false;

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.router.navigateByUrl("/administracao/venda");
      confirmed = true;
    }

    if (!confirmed) {
      this.messageService.addConfirmYesNo("MSG010", () => {
        this.router.navigateByUrl("/administracao/venda");
      });
    }
  }

  /**
   * Fecar o Modal de Vinculação de Usuário do AD.
   */
  public closeDialogs(): void {
    this.dialogRef.close();
  }

  /**
   * Verifica se o CPF informado é válido.
   */
}
