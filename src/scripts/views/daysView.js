import View from "./View";
import trashIcon from "../../assets/delete.png";

class DaysView extends View {
  //essa função é chamada quando a instância é criada
  _warningElement = document.getElementById("delete-day-warning");
  _confirmBtn = document.getElementById("delete-day-confirm-btn");
  _cancelBtn = document.getElementById("delete-day-cancel-btn");
  _currentDay;

  constructor() {
    super();
    this._parentElement = document.getElementById("days-list");
    this._cancelBtn.addEventListener("click", this._hiddenWarning.bind(this));
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
          <li id="${day.id}" class="day">
            <h2>${String(day.day).padStart(2, "0")}/${day.month}</h2>
            <h2>${day.year}</h2>
            <h3>${day.diff}</h3>
            <button type="button" class="delete-day">
              <img src="${trashIcon}"/>
            </button>
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

  handleClickEvent() {
    this._parentElement.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      const dayId = e.target.closest("li")?.id;

      if (button && dayId) {
        this._currentDay = dayId;
        this._showWarning();
      }
    });
  }

  handleDeleteEvent(handler) {
    this._confirmBtn.addEventListener("click", () => {
      handler(this._currentDay);
      this._hiddenWarning();
    });
  }

  _showWarning() {
    this._warningElement.classList.remove("hidden");
  }

  _hiddenWarning() {
    this._warningElement.classList.add("hidden");
  }
}

export default new DaysView();
