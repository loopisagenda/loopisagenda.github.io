import * as model from "./model.js";
import DaysView from "./views/daysView.js";
import AddDayView from "./views/addDayView.js";
import AddTaskView from "./views/addTaskView.js";

//essa função será chamada assim que a página carregar
function controlDays() {
  //o model atualizará o estado
  model.getData();
  //o controller manda a view atualizar o html em tela
  DaysView.render(model.state.days);
}

function init() {
  //controller avisa para a view avisá-lo quando a página carregar
  DaysView.handleLoadEvent(controlDays);
}

init();
