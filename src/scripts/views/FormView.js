//Essa é a classe pai de todos os formulários
class FormView {
  
  _parentElement;
  _data;
  _actBtn;
  _formElement;
  _cancelAddDay = document.getElementById("cancelAddDay");
  _cancelAddTask = document.getElementById("cancelAddTask");

  //mostra o formulário
  _showForm() {
    this._parentElement.classList.remove("hidden");
  }

  //esconde o formulário
  _hiddenForm() {
    this._parentElement.classList.add("hidden");
  }

  //observa pelo clique no botão de ação e mostra o formulário se isso acontecer
  _handleClickEvent() {
    this._actBtn.addEventListener("click", this._showForm.bind(this));
  }

  //observa pelo pressionar na tecla esc e oculta o formulário caso isso aconteça
  _handleKeyEvent() {
    window.addEventListener("keydown", (e) => {
      if (e.key == "Escape") this._hiddenForm();
    });
    this._cancelAddDay.addEventListener('click', () => {
      this._hiddenForm();
    });7
    this._cancelAddTask.addEventListener('click', () => {
      this._hiddenForm();
    });
  }
}

export default FormView;
