import FormView from "./FormView.js";
class AddDayView extends FormView {
  constructor() {
    super();
    this._parentElement = document.getElementById("add-day-form");
    this._actBtn = document.getElementById("add-day-btn");
    this._handleClickEvent();
    this._handleKeyEvent();
  }
}

export default new AddDayView();
