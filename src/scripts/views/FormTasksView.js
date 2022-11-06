import FormView from "./FormView.js";

class AddTaskView extends FormView {
  constructor() {
    super();
    this._parentElement = document.getElementById("add-task-form");
    this._formElement = document.getElementById("form-add-task");
    this._actBtn = document.getElementById("add-task-btn");
    this._handleClickEvent();
    this._handleKeyEvent();
  }

  handleSubmitEvent(handler) {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target;
      const tskTitle = form[0].value;
      const tskDescription = form[1].value;

      this._hiddenForm();
      e.target[0].value = "";
      e.target[1].value = "";
      handler(tskTitle, tskDescription);
    });
  }
}

export default new AddTaskView();
