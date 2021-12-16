import { ProdutoListResolve } from './../../produto/shared/produto-client/produto-list.resolve';
import { StatusEspera } from './../../../shared/app.constantes';
import { ProdutoClientService } from './../../produto/shared/produto-client/produto-client.service';

/* tslint:disable:no-redundant-jsdoc */
import { NgForm } from "@angular/forms";
import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { MessageService } from "../../../shared/message/message.service";
import { AcaoSistema } from "../../../shared/component/acao-sistema.acao";
import { SecurityService } from "../../../shared/security/security.service";


import { exit } from 'process';
import { isProtractorLocator } from 'protractor/built/locators';
import { MensagemClientService } from '../shared/mensagem-client.service';


/**
 * Componente de formulário de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: "app-mensagem-form",
  templateUrl: "./mensagem-form.component1.html",
  styleUrls: ["./mensagem-form.component.scss"],
})
export class MensagemFormComponent {
  public acaoSistema: AcaoSistema;
  public valorTotalMensagem: Number;
  public mensagem: any;
  public telefonesMensagem: any[];
  public produtoInclusao: any;
  public produtosVinculados: any[];
  public produtos: any[];
  public submittedMensagem: boolean;
  public submittedProduto: boolean;
  public valorMensagem?: Number;
  public QuantidaParaAlteração?:Number;
  public Number?:String;


  private dialogRef: MatDialogRef<any>;

  public dataSourceProdutos: MatTableDataSource<any>;

  public displayedColumns: any;

  @ViewChild("formMensagem", { static: true }) formMensagem: NgForm;
  @ViewChild("formProduto", { static: true }) formProduto: NgForm;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param dialog
   * @param messageService
   * @param securityService
   * @param produtoClientService
   * @param mensagemClientService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    public securityService: SecurityService,
    private produtoClientService: ProdutoClientService,
    private mensagemClientService: MensagemClientService,

  ) {
    this.acaoSistema = new AcaoSistema(route);
    this.dataSourceProdutos = new MatTableDataSource<any>();

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.displayedColumns = ["dataAlteracao","quantidade"];
    } else {
      this.displayedColumns = ["dataAlteracao","quantidade", "remover"];
    }

    if (this.acaoSistema.isAcaoIncluir()) {
      this.produtoInclusao = {};
      this.produtosVinculados = [];
      this.dataSourceProdutos.data = this.produtosVinculados;

      this.carregarProdutos();

      // Inicializa o Usuário para Inclusão
      this.mensagem = {


      };
    }

    if (this.acaoSistema.isAcaoAlterar()) {
      this.produtoInclusao = {};
      this.carregarProdutos();
    }

    if (
      this.acaoSistema.isAcaoAlterar() ||
      this.acaoSistema.isAcaoVisualizar()
    ) {
      this.mensagem = route.snapshot.data.mensagens;
      this.produtos= route.snapshot.data.produto;
      this.produtosVinculados = this.mensagem.produto;
      this.dataSourceProdutos.data = this.produtosVinculados;
    }
  }

  /**
   * Carrega os Produtos pelo id do Sistema.
   *
   * @param idSistema
   */
  public carregarProdutos(): void {
    this.produtoClientService.getProdutosAtivos().subscribe(
      (data) => {
        this.produtos = data;
      },
      (error) => {
        this.produtos = undefined;
        if (error.code !== "ME003") {
          this.messageService.addMsgDanger(error);
        }
      }
    );
    delete this.produtoInclusao.produto;
  }

  /**
   * Adicionar o Produto à lista de Produtos do Usuário.
   *
   * @param produtoInclusao
   * @param form
   * @param event
   */
  public adicionarProduto(produtoInclusao: any, form: NgForm, event: any): void {
    form.onSubmit(event);
    this.submittedProduto = true;

    if (form.valid) {
      // Busca o Produto a ser adicionado na lista
      const produtoVinculado = this.produtosVinculados.find(
        (produto) => produto.idProduto === produtoInclusao.produto.id
      );




      // Verifica se o Produto foi encontrado
      if (produtoVinculado === undefined && this.mensagem<=produtoInclusao.produto.quantidade) {
        this.produtosVinculados.push({



          idMensagem: this.mensagem.id,
          idProduto: produtoInclusao.produto.id,
          preco: produtoInclusao.produto.preco,
          nomeProduto: produtoInclusao.produto.nome,
          valorTotal:this.mensagem.valorTotal,
          nomeSistemaProduto: produtoInclusao.produto.nomeSistema,

        });

          console.log(produtoInclusao.produto.valorProduto);
          this.dataSourceProdutos.data = this.produtosVinculados;

           form.onReset();
           this.produtoInclusao = {};



      } else {
        if(this.mensagem<=produtoInclusao.produto.quantidade)
        this.messageService.addMsgDanger("MSG011");

        if(this.mensagem>produtoInclusao.produto.quantidade)
        this.messageService.addMsgDanger("MSG048");
      }
    }
  }

  /**
   * Remove o Produto da lista de produtos do Usuário.
   *
   * @param produto
   *
   * Alterei com adição do service, html
   */
  public removerProduto(produto: any, mensagem:any ) {

      this.messageService.addConfirmYesNo("MSG006", () => {

      const index = this.produtosVinculados.indexOf(produto);
      this.produtosVinculados.splice(index, 1);
      this.dataSourceProdutos.data = this.produtosVinculados;
      this.mensagemClientService.alterarProduto(mensagem).subscribe(
        () => {

          this.messageService.addMsgSuccess("MSG007");
        },
        (error) => {
          this.messageService.addMsgDanger(error);
        }
      );



    });




  }

  /**
   * Salva a instância de Usuário.
   *
   * @param mensagem
   * @param form
   * @param event
   */
  public salvar(mensagem: any, form: NgForm, event: any) {
    form.onSubmit(event);
    this.submittedMensagem = true;


    if (form.valid) {
      if (this.produtosVinculados.length > 0) {

        mensagem.itemMensagem = this.produtosVinculados;
       // console.log(mensagem);

        this.mensagemClientService.salvar(mensagem).subscribe(
          () => {
            this.router.navigate(["/administracao/mensagem"]);
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
   * Confirma o cancelamento e volta para a tela de Pesquisa.
   */
  public cancelar(): void {
    let confirmed = false;

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.router.navigateByUrl("/administracao/mensagem");
      confirmed = true;
    }

    if (!confirmed) {
      this.messageService.addConfirmYesNo("MSG010", () => {
        this.router.navigateByUrl("/administracao/mensagem");
      });
    }
  }

  /**
   * Fecar o Modal de Vinculação de Usuário do AD.
   */
  public closeDialogs(): void {
    this.dialogRef.close();
  }








}
