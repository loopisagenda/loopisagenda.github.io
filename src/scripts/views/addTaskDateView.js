import FormView from "./FormView.js";
class AddTaskDateView extends FormView {
  constructor() {
    super();
    this._parentElement = document.getElementById("add-task-date");
    this._actBtn = document.getElementById("add-task-date-btn");
    this._handleClickEvent();
    this._handleKeyEvent();
  }
}

export default new AddTaskDateView();
