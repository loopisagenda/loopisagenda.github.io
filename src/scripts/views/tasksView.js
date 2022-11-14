import View from "./View.js";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";

class TasksView extends View {
  _editTaskFormContainer = document.getElementById("edit-task-form-container");
  _editTaskForm = document.getElementById("form-edit-task");
  _cancelEditBtn = document.getElementById("cancelEdit");
  _confirmDelTaskBtn = document.getElementById("approveDelete");
  _cancelDelTaskBtn = document.getElementById("cancelDelete");
  _titleTaskForm = document.getElementById("receptTaskName");
  _currentDay = document.getElementById("current-day-container");
  _actBtn = document.getElementById("add-task-btn");
  _container = document.getElementById("tasks-container");
  _currentDate = "";
  _warningDeleteTask = document.getElementById("delete-task-warning");

  constructor() {
    super();
    this._parentElement = document.getElementById("tasks-list");
    this._handleClickEvent();
    this._handleExtraEvents();
  }

  //gera o html das tarefas obs: ainda não está pronto
  _generateHtml() {
    this._clear();
    const tasks = this._data;

    tasks.forEach((task) => {
      this._parentElement.innerHTML += `<li id="${task.id}" class="task">
            <h2>${task.title}</h2>
            <p>${task.description}</p>
            <span>
              <button type="button" class="edit-task-btn">
                <img src="${editIcon}" alt="" />
              </button>
              <button type="button" class="delete-task-btn">
                <img src="${deleteIcon}" alt="" />
              </button>
            </span>
          </li>`;
    });
  }

  //mostra o container das tarefas e ajusta a data corretamente
  updateContainer(date) {
    this._currentDate = `${String(date.day).padStart(2, "0")}/${String(
      date.month
    ).padStart(2, "0")}/${date.year}`;
    this._currentDay.textContent = `Atividades do dia: ${this._currentDate}`;
    this._container.classList.remove("hidden");
    this._actBtn.classList.remove("hidden");
    this._clear();
  }

  //oculta o container das tarefas
  hiddeActionButton() {
    // this._container.classList.add("hidden");
    this._actBtn.classList.add("hidden");
  }

  showOkMessage() {
    this._clear();
    this._currentDay.textContent = `Dia deletado com sucesso!`;
  }

  //observa um clique do elemento pai e informa ao controller se o que foi clicado é o botão de editar ou de excluir
  _handleClickEvent() {
    this._parentElement.addEventListener("click", (e) => {
      const task = e.target.closest(".task");
      const taskTitle = task?.firstElementChild.textContent;
      const taskDescription = task.children[1].textContent;

      if (e.target.closest("button")?.classList.contains("edit-task-btn")) {
        this._editTaskFormContainer.classList.remove("hidden");
        this._titleTaskForm.textContent = `Atividade: ${taskTitle}`;
        this._currentTaskId = task.id;

        const date = document.getElementById(
          "current-day-container"
        ).textContent;
        let day = date.substring(19, 21);
        let month = date.substring(22, 24);
        let year = date.substring(25, 29);

        document.getElementById("editTaskName").value = taskTitle;
        document.getElementById("editDescription").value = taskDescription;
        document.getElementById("dateEdit").value = (
          year +
          "-" +
          month +
          "-" +
          day
        ).toString();
      } else if (
        e.target.closest("button")?.classList.contains("delete-task-btn")
      ) {
        document.getElementById("receptTaskNameDelete").textContent = taskTitle;
        this._currentTaskId = task.id;
        this._showWarningDelete();
      }
    });
  }

  handleDeleteTaskConfirmation(handler) {
    this._confirmDelTaskBtn.addEventListener("click", () => {
      const taskId = this._currentTaskId;
      this._hiddeWarningDelete();
      handler(taskId);
    });
  }

  //observa pelo envio do formulário de edição e executa o handler caso isso aconteça
  handleSubmitEditFormEvent(handler) {
    this._editTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const newTasktitle = e.target[0].value;
      const newTaskDescription = e.target[1].value;
      const newTaskDate = e.target[2].value;

      this._hiddeEditForm();

      handler(
        newTasktitle,
        newTaskDescription,
        newTaskDate,
        this._currentTaskId
      );
    });
  }

  //observa o clicar da tecla esc e do botão cancelar para esconder o formulário de edição
  _handleExtraEvents() {
    window.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        this._editTaskFormContainer.classList.add("hidden");
      }
    });

    this._cancelEditBtn.addEventListener(
      "click",
      this._hiddeEditForm.bind(this)
    );

    this._cancelDelTaskBtn.addEventListener(
      "click",
      this._hiddeWarningDelete.bind(this)
    );
  }

  //esconde o formulário de edição
  _hiddeEditForm() {
    this._editTaskFormContainer.classList.add("hidden");
    this._editTaskForm[0].value = "";
    this._editTaskForm[1].value = "";
    this._editTaskForm[2].value = "";
  }

  _showWarningDelete() {
    this._warningDeleteTask.classList.remove("hidden");
  }

  _hiddeWarningDelete() {
    this._warningDeleteTask.classList.add("hidden");
  }
}

export default new TasksView();
