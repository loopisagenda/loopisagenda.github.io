import View from "./View.js";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";

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
    this._clear();
    const tasks = this._data;

    tasks.forEach((task) => {
      this._parentElement.innerHTML += `<li id="${tasks.id}" class="task">
            <h2>${task.title}</h2>
            <p>${task.description}</p>
            <button type="button" class="edit-task-btn">
              <img src="${editIcon}" alt="" />
            </button>
            <button type="button" class="delete-task-btn">
              <img src="${deleteIcon}" alt="" />
            </button>
          </li>`;
    });
  }

  //mostra o container das tarefas e ajusta a data corretamente
  showContainer(date) {
    this._currentDate = `${String(date.day).padStart(2, "0")}/${date.month}/${
      date.year
    }`;
    this._currentDay.textContent = `Atividades do dia: ${this._currentDate}`;
    this._container.classList.remove("hidden");
    this._clear();
  }

  //oculta o container das tarefas
  hiddeContainer() {
    this._container.classList.add("hidden");
  }
}

export default new TasksView();
