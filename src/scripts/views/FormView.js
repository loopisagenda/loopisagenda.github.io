class FormView {
  _parentElement;
  _data;
  _actBtn;

  render(data) {
    //os dados da classe são atualizados
    this._data = data;
    //depois é chamado o método generateHtml, que deve estar presente na classe herdeira
    this._generateHtml();
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _showForm() {
    this._parentElement.classList.remove("hidden");
  }

  _hiddenForm() {
    this._parentElement.classList.add("hidden");
  }

  _handleClickEvent() {
    this._actBtn.addEventListener("click", this._showForm.bind(this));
  }

  _handleKeyEvent() {
    window.addEventListener("keydown", (e) => {
      if (e.key == "Escape") this._hiddenForm();
    });
  }
}

export default FormView;
