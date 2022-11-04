import FormView from "./FormView.js";
class AddTaskDateView extends FormView {
  constructor() {
    super();
    this._parentElement = document.getElementById("add-day-form"); //essa é a div
    this._formElement = document.getElementById("form-day"); //esse é o formulário em si
    this._actBtn = document.getElementById("add-day-btn");
    this._handleClickEvent();
    this._handleKeyEvent();
  }

  _handleSubmitEvent(handler) {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const date = e.target[0].value;

      handler(date);
      this._hiddenForm();
    });
  }
}

export default new AddTaskDateView();
