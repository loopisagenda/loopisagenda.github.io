import FormView from "./FormView.js";

class AddTaskView extends FormView {
  constructor() {
    super();
    this._parentElement = document.getElementById("add-task-form");
    this._actBtn = document.getElementById("add-task-btn");
    this._handleClickEvent();
    this._handleKeyEvent();
  }
}

export default new AddTaskView();
