/* tslint:disable:no-redundant-jsdoc */
import {NgForm} from '@angular/forms';
import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MessageService} from '../../../shared/message/message.service';
import {AcaoSistema} from '../../../shared/component/acao-sistema.acao';
import {SecurityService} from '../../../shared/security/security.service';
import {TipoProdutoClientService} from '../shared/tipo-amigo-client/tipo-produto-client.service';

/**
 * Componente de formulário de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-usuario-form',
  templateUrl: './tipo-produto-form.component.html',
  styleUrls: ['./tipo-produto-form.component.scss']
})
export class TipoProdutoFormComponent {

  public acaoSistema: AcaoSistema;

  public tipoProduto: any;
  public submitted: boolean;

  private dialogRef: MatDialogRef<any>;

  @ViewChild('formTipoProduto', { static: true }) formTipoProduto: NgForm;

  /**
   * Construtor da classe.
   *
   * @param route
   * @param router
   * @param dialog
   * @param messageService
   * @param securityService
   * @param tipoProdutoClientService
   */
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    public securityService: SecurityService,
    private tipoProdutoClientService: TipoProdutoClientService
  ) {
    this.acaoSistema = new AcaoSistema(route);

    if (this.acaoSistema.isAcaoIncluir()) {
      this.tipoProduto = {};
    }

    if (this.acaoSistema.isAcaoAlterar() || this.acaoSistema.isAcaoVisualizar()) {
      this.tipoProduto = route.snapshot.data.tipoProduto;
    }
  }

  /**
   * Salva a instância de Usuário.
   *
   * @param tipoProduto
   * @param form
   * @param event
   */
  public salvar(tipoProduto: any, form: NgForm, event: any) {
    form.onSubmit(event);
    this.submitted = true;

    if (form.valid) {
      this.tipoProdutoClientService.salvar(tipoProduto).subscribe(() => {
        this.router.navigate(['/administracao/tipo-produto']);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        this.messageService.addMsgDanger(error);
      });
    } else {
      this.messageService.addMsgSuccess('MSG001');
    }
  }

  /**
   * Remover o Tipo de Produto informado.
   *
   * @param tipoProduto
   */
  private remover(tipoProduto: any): void {
    this.messageService.addConfirmYesNo('MSG045', () => {
      this.tipoProdutoClientService.remover(tipoProduto).subscribe(() => {
        this.router.navigate(['/administracao/tipo-produto']);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        tipoProduto.status = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      tipoProduto.status = true;
    });
  }

  /**
   * Confirma o cancelamento e volta para a tela de Pesquisa.
   */
  public cancelar(): void {
    let confirmed = false;

    if (this.acaoSistema.isAcaoVisualizar()) {
      this.router.navigateByUrl('/administracao/tipo-produto');
      confirmed = true;
    }

    if ( !confirmed ) {
      this.messageService.addConfirmYesNo('MSG010', () => {
        this.router.navigateByUrl('/administracao/tipo-produto');
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
