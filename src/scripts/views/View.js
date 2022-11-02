/**
 *
 * Essa é a classe pai. Todas as outras classes herdarão os métodos dessa classe
 *
 * Todos os métodos e variáveis que contenham _(underline) não podem ser acessados nem manipulados
 * fora de sua classe
 *
 */

class View {
  //cada classe herdeira tem o seu próprio elemento pai e seus próprios dados
  _parentElement;
  _data;

  render(data) {
    //os dados da classe são atualizados
    this._data = data;
    //depois é chamado o método generateHtml, que deve estar presente na classe herdeira
    this._generateHtml();
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}

export default View;
