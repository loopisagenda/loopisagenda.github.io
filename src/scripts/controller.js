import * as model from "./model.js";
import DaysView from "./views/daysView.js";
import TasksView from "./views/tasksView.js";
import FormDaysView from "./views/FormDaysView.js";
import FormTasksView from "./views/FormTasksView.js";
import tasksView from "./views/tasksView.js";

//carrega as tarefas caso existam no carregamento inicial
const controlDays = () => {
  model.getData();
  DaysView.render(model.state.days);
}

//controlea o funcionamento de adicionar dias
const controlAddDay = (date) => {
  model.addDay(date);
  DaysView.render(model.state.days);
}

//controla o funcionamento de deletar dias
const controlDeleteDay = (dayId) => {
  model.removeDay(dayId);
  DaysView.render(model.state.days);
  TasksView.hiddeContainer();
}

//controla o funcionamento de mudar o dia em questão
const controlCurrentDay = (dayId) => {
  model.setTargetDay(dayId);
  TasksView.showContainer(model.state.targetDay);
  tasksView.render(model.state.targetDay.tasks);
}

//controla o funcionamento de adicionar tarefas
const controlAddTask = (taskTitle, taskDesctiption) => {
  model.addTask(taskTitle, taskDesctiption);
  TasksView.render(model.state.targetDay.tasks);
}

const controlDeleteTask = (taskId) => {
  model.deleteTask(taskId);
  TasksView.render(model.state.targetDay.tasks);
  DaysView.render(model.state.days);
}

const controlEditTask = (
  newTaskTitle,
  newTaskDescription,
  newTaskDate,
  taskId
) => {
    model.editTask(newTaskTitle, newTaskDescription, newTaskDate, taskId);
    TasksView.showContainer(model.state.targetDay);
    DaysView.render(model.state.days);
    TasksView.render(model.state.targetDay.tasks);
}

const init = () => {
  DaysView.handleLoadEvent(controlDays);
  DaysView.handleClickEvent(controlCurrentDay);
  DaysView.handleDeleteEvent(controlDeleteDay);
  TasksView.handleDeleteTaskConfirmation(controlDeleteTask);
  TasksView.handleSubmitEditFormEvent(controlEditTask);
  FormDaysView.handleSubmitEvent(controlAddDay);
  FormTasksView.handleSubmitEvent(controlAddTask);
}

init();
