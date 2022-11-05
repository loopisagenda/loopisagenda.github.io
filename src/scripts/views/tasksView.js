import View from "./View.js";

class TasksView extends View {
  _currentDay = document.getElementById("current-day-container");
  _container = document.getElementById("tasks-container");
  _currentDate = "";

  constructor() {
    super();
    this._parentElement = document.getElementById("tasks-list");
  }

  //gera o html das tarefas obs: ainda não está pronto
  _generateHtml() {
    this._parentElement.insertAdjacentHTML(
      "afterend",
      `<li class="task">
            <h2>Atividade</h2>
            <p>Descrição da atividade aqui</p>
            <button type="button">
              <img src="./src/assets/edit.png" alt="" />
            </button>
            <button type="button">
              <img src="./src/assets/delete.png" alt="" />
            </button>
          </li>`
    );
  }

  //mostra o container das tarefas e ajusta a data corretamente
  showContainer(date) {
    this._currentDate = `${String(date.day).padStart(2, "0")}/${date.month}/${
      date.year
    }`;
    this._currentDay.textContent = `Atividades do dia: ${this._currentDate}`;
    this._container.classList.remove("hidden");
  }

  //oculta o container das tarefas
  hiddeContainer() {
    this._container.classList.add("hidden");
  }
}

export default new TasksView();
