/* tslint:disable:no-redundant-jsdoc */
import {ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Component, OnInit, ViewChild} from '@angular/core';

import {MessageService} from 'src/app/shared/message/message.service';
import {SecurityService} from 'src/app/shared/security/security.service';
import {AbstractComponent} from '../../../shared/component/Abstract.component';
import {formatDate} from '@angular/common';
import { FiltroVendaDTO } from 'src/app/shared/dto/filtro-venda.dto';
import { VendaClientService } from '../shared/venda-client/venda-client.service';

/**
 * Componente de listagem de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'app-usuario-list',
  templateUrl: './venda-list.component.html',
  styleUrls: ['./venda-list.component.scss']
})
export class VendaListComponent extends AbstractComponent implements OnInit {

  public filtroDTO: FiltroVendaDTO;

  public dataSource: MatTableDataSource<any>;

  public dataVenda: Date = null;

  public displayedColumns = ['valorTotal', 'dataVenda', 'quantidade', 'acoes'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  /**
   * Construtor da classe.
   *
   * @param route
   * @param messageService
   * @param securityService
   * @param vendaClientService
   */
  constructor(
    route: ActivatedRoute,
    private messageService: MessageService,
    public securityService: SecurityService,
    private vendaClientService: VendaClientService
  ) {
    super();
    const vendas = route.snapshot.data.vendas;
    this.dataSource = new MatTableDataSource<any>(vendas);
  }

  /**
   * Inicializa o Component.
   */
  ngOnInit() {
    this.filtroDTO = FiltroVendaDTO.getInstace();
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Pesquisa o Venda conforme o filtro de pesquisa informado.
   *
   * @param filtroVendaDTO
   */
  public pesquisar(filtroVendaDTO: FiltroVendaDTO): void {
    if (this.dataVenda != null) {
      this.filtroDTO.dataVenda = formatDate(this.dataVenda, 'yyyy/MM/dd', 'pt-br');
    }
    this.vendaClientService.getByFiltro(filtroVendaDTO).subscribe(data => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = data;
    }, data => {
      this.messageService.addMsgDanger(data);
      this.dataSource.data = [];
    });
  }

  /**
   * Limpa o filtro de pesquisa informado.
   */
  public limpar(): void {
    this.filtroDTO = FiltroVendaDTO.getInstace();
    this.dataSource.data = [];
  }

  /**
   * Altera o status do Venda informado.
   *
   * @param venda

  public alterarStatusVenda(venda: any): void {
    console.log('alterastatus:', venda);
    if (venda.venda) {
      this.tornarVenda(venda);
    } else {
      this.deixarVenda(venda);
    }
  }
*/
  /**
   * Tornar Venda o Venda informado.
   *
   * @param venda
   */
  private tornarVenda(venda: any): void {
    this.messageService.addConfirmYesNo('MSG046', () => {
      this.vendaClientService.tornarVenda(venda.id).subscribe(() => {
        this.pesquisar(this.filtroDTO);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        venda.venda = false;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      venda.venda = false;
    });
  }

  /**
   * Deixar de ser Venda do cadastro informado.
   *
   * @param venda

  private deixarVenda(venda: any): void {
    this.messageService.addConfirmYesNo('MSG047', () => {
      this.vendaClientService.deixarAmizade(venda.id).subscribe(() => {
        this.pesquisar(this.filtroDTO);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        venda.venda = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      venda.venda = true;
    });
  }
*/
  /**
   * remover o Venda informado.
   *
   * @param venda
   */
  private remover(venda: any): void {
    this.messageService.addConfirmYesNo('MSG045', () => {
      this.vendaClientService.remover(venda).subscribe(() => {
        this.filtroDTO.dataVenda = this.filtroDTO.dataVenda ? this.filtroDTO.dataVenda : '%';
        this.pesquisar(this.filtroDTO);
        this.messageService.addMsgSuccess('MSG007');
      }, error => {
        venda.status = false;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      venda.status = false;
    });
  }
}
