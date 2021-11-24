
/* tslint:disable:no-redundant-jsdoc */
import { HttpParams } from '@angular/common/http';

/**
 * Classe de trânsferencia com os parâmetros utilizados em filtros de pesquisa de Venda.
 *
 * @author Guiliano Rangel (UEG)
 */
export class FiltroVendaDTO {

  /**
   * Construtor da classe.
   *
   * @param idProduto
   * @param valorTotal
   * @param dataVenda
<<<<<<< HEAD
   *
=======
   * @param quantidade
>>>>>>> 4ee0625b4227de64aed867634b7d78fd0d43ef70
   *
   */
  constructor(
    public idProduto?: number,
    public valorTotal?: DoubleRange,
    public dataVenda?: string,
<<<<<<< HEAD

=======
    public quantidade?: number
>>>>>>> 4ee0625b4227de64aed867634b7d78fd0d43ef70
  ) { }

  /**
   * Transforma o JSON do parâmetro em um objeto do modelo de dominio da aplicação.
   *
   * @param jsonData
   */
  static fromJson(jsonData: any): FiltroVendaDTO {
    return Object.assign(new FiltroVendaDTO(), jsonData);
  }

  /**
   * Retorna uma nova instancia de FiltroDTO
   */
  static getInstace(): FiltroVendaDTO {
    return new FiltroVendaDTO();
  }

  /**
   * Retorna a instância de HttpParams considerando os parâmetros informados.
   */
  public toParams(): HttpParams {
    let params = new HttpParams();

    if (this.idProduto) {
      params = params.append('idTipoVenda', String(this.idProduto) );
    }

    if (this.dataVenda) {
      params = params.append('dataVenda', this.dataVenda );
    }

    if (this.valorTotal) {
      params = params.append('valorTotal', this.valorTotal.toString() );
    }

<<<<<<< HEAD
=======
    if (this.quantidade) {
      params = params.append('quantidade', this.quantidade.toString() );
    }

>>>>>>> 4ee0625b4227de64aed867634b7d78fd0d43ef70
    return params;
  }
}
