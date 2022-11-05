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

  //gera o html de cada dia e o insere na lista
  _generateHtml() {
    this._clear();

    const days = this._data;

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

  //espera o carregamento na tela e executa a função handler(passada pelo controller) quando o evento ocorrer
  handleLoadEvent(handler) {
    window.addEventListener("load", () => handler());
  }

  /**
   *
   * obersa por um click na lista dos dias e observa se o ponto clicado é um dia ou um botão de deletar dia. Se foi um
   * botão então ela mostra o aviso de deletar dia. Caso tenha sido um dia, ela executa a função handler passada pelo controller
   */
  handleClickEvent(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      const dayId = e.target.closest("li")?.id;

      if (button && dayId) {
        this._currentDay = dayId;
        this._showWarning();
      } else if (dayId) {
        handler(dayId);
      }
    });
  }

  //observa se o botão de confirmação para deletar um dia foi clicado e executa a função handler passada pelo controller caso isso aconteça
  handleDeleteEvent(handler) {
    this._confirmBtn.addEventListener("click", () => {
      handler(this._currentDay);
      this._hiddenWarning();
    });
  }

  //mostra o aviso de remoção
  _showWarning() {
    this._warningElement.classList.remove("hidden");
  }

  //oculta o aviso de remoção
  _hiddenWarning() {
    this._warningElement.classList.add("hidden");
  }
}

export default new DaysView();
