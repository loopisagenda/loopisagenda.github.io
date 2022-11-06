import * as model from "./model.js";
import DaysView from "./views/daysView.js";
import TasksView from "./views/tasksView.js";
import FormDaysView from "./views/FormDaysView.js";
import FormTasksView from "./views/FormTasksView.js";
import tasksView from "./views/tasksView.js";

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
  tasksView.render(model.state.targetDay.tasks);
}

//controla o funcionamento de adicionar tarefas
function controlAddTask(taskTitle, taskDesctiption) {
  model.addTask(taskTitle, taskDesctiption);
  TasksView.render(model.state.targetDay.tasks);
}

function controlDeleteTask(taskId) {
  model.deleteTask(taskId);
  TasksView.render(model.state.targetDay.tasks);
  DaysView.render(model.state.days);
}

function controlEditTask(
  newTaskTitle,
  newTaskDescription,
  newTaskDate,
  taskId
) {
  model.editTask(newTaskTitle, newTaskDescription, newTaskDate, taskId);
  TasksView.showContainer(model.state.targetDay);
  DaysView.render(model.state.days);
  TasksView.render(model.state.targetDay.tasks);
}

function init() {
  DaysView.handleLoadEvent(controlDays);
  DaysView.handleClickEvent(controlCurrentDay);
  DaysView.handleDeleteEvent(controlDeleteDay);
  TasksView.handleDeleteTaskConfirmation(controlDeleteTask);
  TasksView.handleSubmitEditFormEvent(controlEditTask);
  FormDaysView.handleSubmitEvent(controlAddDay);
  FormTasksView.handleSubmitEvent(controlAddTask);
}

init();
