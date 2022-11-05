import * as model from "./model.js";
import DaysView from "./views/daysView.js";
import TasksView from "./views/tasksView.js";
import FormDaysView from "./views/FormDaysView.js";
import FormTasksView from "./views/FormTasksView.js";

//carrega as tarefas caso existam no carregamento inicial
function controlDays() {
  model.getData();
  DaysView.render(model.state.days);
}

//controlea o funcionamento de adicionar dias
function controlAddDay(date) {
  model.addDay(date);
  DaysView.render(model.state.days);
}

//controla o funcionamento de deletar dias
function controlDeleteDay(dayId) {
  model.removeDay(dayId);
  DaysView.render(model.state.days);
  TasksView.hiddeContainer();
}

//controla o funcionamento de mudar o dia em questão
function controlCurrentDay(dayId) {
  model.setTargetDay(dayId);
  TasksView.showContainer(model.state.targetDay);
}

function init() {
  DaysView.handleLoadEvent(controlDays);
  DaysView.handleClickEvent(controlCurrentDay);
  DaysView.handleDeleteEvent(controlDeleteDay);
  FormDaysView._handleSubmitEvent(controlAddDay);
}

init();
