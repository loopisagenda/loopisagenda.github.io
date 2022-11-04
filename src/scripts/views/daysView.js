import View from "./View";

class DaysView extends View {
  //essa função é chamada quando a instância é criada
  constructor() {
    super();
    this._parentElement = document.getElementById("days-list");
  }

  _generateHtml() {
    /**
     * Primeiro devemos limpar o html presente no elemento pai para não haver conflitos. Lembrando que esse método clear está presente na classe pai(View), por isso a classe DaysView consegue utilizá-lo
     */
    this._clear();

    //aqui guardei o valor de _data em uma variável com um nome mais autoexplicativo
    const days = this._data;

    //para cada dia existente, iremos inserir no container(_parentElement)
    days.forEach((day) => {
      this._parentElement.innerHTML += `
          <li class="day">
            <h2>${day.day}/${day.month}</h2>
            <h2>${day.year}</h2>
            <span>${day.diff}</span>
          </li>
        `;
    });
  }

  handleLoadEvent(handler) {
    /**quando a página carregar, a view executa a função passada pelo controller.
     * Ela não tem a menor ideia do que essa função faz, ela apenas obedece ao controller.
     */
    window.addEventListener("load", () => handler());
  }
}

export default new DaysView();
