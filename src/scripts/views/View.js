//Essa é a classe pai de todas as views exceto os formulários
class View {
  
  //cada classe herdeira tem o seu próprio elemento pai e seus próprios dados
  _parentElement;
  _data;

  //ajusta os dados corretamente (na classe herdeira) e chama o método para gerar o html que é diferente para cada classe herdeira
  render(data) {
    this._data = data;
    this._generateHtml();
  }

  //limpa o elemento pai
  _clear() {
    this._parentElement.innerHTML = "";
  }
}

export default View;
