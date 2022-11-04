import * as model from "./model.js";
import DaysView from "./views/daysView.js";
import FormDaysView from "./views/FormDaysView.js";
import FormTasksView from "./views/FormTasksView.js";

//essa função será chamada assim que a página carregar
function controlDays() {
  //o model atualizará o estado
  model.getData();
  model.state.days.map(v => v.diff = model.getDiffProp(v));
  //o controller manda a view atualizar o html em tela
  DaysView.render(model.state.days);
}

/**
 * Essa função recebe uma data e a formata para ser passada como parâmetro para o model
 * @param {string} date data do dia a ser criado ex: "2022-11-04"
 * @todo Separar o day, month e year em variáveis
 * @todo chamar a função addDay do model com o day, month e year como parâmetros
 * @todo chamar o método render da classe DaysView com o estado atualizado
 */
function controlAddDay(date) {
  model.addDay(date);
}

function init() {
  //controller avisa para a view avisá-lo quando a página carregar
  DaysView.handleLoadEvent(controlDays);
  FormDaysView._handleSubmitEvent(controlAddDay);
}

init();
