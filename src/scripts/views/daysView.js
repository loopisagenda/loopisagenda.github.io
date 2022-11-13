import View from "./View";
import trashIcon from "../../assets/delete.png";

class DaysView extends View {
  //essa função é chamada quando a instância é criada
  _openSideMenuBtn = document.getElementById("open-side-menu");
  _overlayCloseMenu = document.getElementById("overlay-close-side-menu");
  _container = document.getElementById("days-container");
  _warningElement = document.getElementById("delete-day-warning");
  _confirmBtn = document.getElementById("delete-day-confirm-btn");
  _cancelBtn = document.getElementById("delete-day-cancel-btn");
  _addDayBtn = document.getElementById("add-day-btn");
  _currentDay;

  constructor() {
    super();
    this._parentElement = document.getElementById("days-list");
    this._handleShowButtonClickEvent();
    this._cancelBtn.addEventListener("click", this._hiddenWarning.bind(this));
    this._overlayCloseMenu.addEventListener(
      "click",
      this._hiddeContainer.bind(this)
    );
    this._addDayBtn.addEventListener("click", this._hiddeContainer.bind(this));
  }

  //gera o html de cada dia e o insere na lista
  _generateHtml() {
    this._clear();
    const days = this._data;

    // imprime na tela os dias de tarefas
    days.forEach((day) => {
      this._parentElement.innerHTML += `
          <li id="${day.id}" class="day">
            <h2>${String(day.day).padStart(2, "0")}/${String(
        day.month
      ).padStart(2, "0")}</h2>
            <h3>${day.year}</h3>
            <h4>${day.diff}</h4>
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
        this._hiddeContainer();
        this._showWarning();
      } else if (dayId) {
        handler(dayId);
        this._hiddeContainer();
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

  //observa pelo evento de clicar no botão de mostrar o menu lateral (visíbel apenas em telas menores)
  _handleShowButtonClickEvent() {
    this._openSideMenuBtn.addEventListener(
      "click",
      this._showContainer.bind(this)
    );
  }

  //mostra o menu lateral em telas menores
  _showContainer() {
    if(window.screen.width <= 768){
      this._container.style.transform = "translateX(0)";
      this._overlayCloseMenu.style.display = "block";
    }
  }
  //esconde o menu lateral em telas menores
  _hiddeContainer() {
    if(window.screen.width <= 768){
      this._container.style.transform = "translateX(-100%)";
      this._overlayCloseMenu.style.display = "none";
    }
    
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
