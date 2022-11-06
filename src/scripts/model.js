import { v4 as uuid } from "uuid";

export const state = {
  days: [],
  targetDay: {}, //isso é importante para sabermos quais tarefas precisamos renderizar com base no dia clicado pelo usuário
};

//seta no localStorage o estado mais atual
function setLocalData() {
  localStorage.setItem("data", JSON.stringify(state.days));
}

//formata a data para o formato estadunidense
function getFormattedDateUSA(date) {
  return `${date.substr(5, 2)}/${date.substr(8, 2)}/${date.substr(0, 4)}`;
}

//formata a data para o formato brasileiro
function getFormattedDateBRA(date) {
  return `${date.substr(8, 2)}/${date.substr(5, 2)}/${date.substr(0, 4)}`;
}

//calcula a diferença de dias entre duas datas
function getDiffDays(date1, date2Data) {
  const date2 = new Date(
    `${date2Data.month}/${date2Data.day}/${date2Data.year}`
  );

  const diffTime = date2 - date1;
  const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
  return diffDays;
}

//pega a data atual, manda para getDiffDays a data em questão para calcular a diferença de dias e gera uma string apropriada
function getDiffProp(date) {
  const currentDate = new Date();
  const diffDays = getDiffDays(currentDate, date);
  if (diffDays == 0) {
    return "Hoje";
  } else if (diffDays == 1) {
    return "Amanhã";
  } else if (diffDays == -1) {
    return "Ontem";
  } else if (diffDays < 0) {
    return `${-diffDays} dias atrás`;
  }
  return `Daqui a ${diffDays} dias`;
}

//pega a data do localStorage no primeiro carregamento caso exista
export function getData() {
  const data = JSON.parse(localStorage.getItem("data")) || "";
  if (data != "") {
    state.days = data;
    state.days.forEach((day) => (day.diff = getDiffProp(day)));
  }
}

//recebe uma data no formato yyyy-mm-d, separa em propiedades, gera um id aleatório para o dia e o adiciona no estado
export function addDay(stringDate) {
  const date = new Date(getFormattedDateUSA(stringDate));

  const newDay = {
    id: uuid(),
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    diff: getDiffProp({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    }),
    tasks: [],
  };
  getData();
  state.days = [...state.days, newDay];
  setLocalData();
}

//deleta um dia com um id específico
export function removeDay(dayId) {
  state.days = state.days.filter((day) => day.id != dayId);
  setLocalData();
}

//muda o dia alvo
export function setTargetDay(dayId) {
  state.targetDay = state.days.find((day) => day.id == dayId);
}

//adiciona uma tarefa no dia alvo (target day)
export function addTask(taskTitle, taskDescription) {
  const tskObj = {
    title: taskTitle,
    description: taskDescription,
    id: uuid(),
  };

  const i = state.days.findIndex((day) => day.id == state.targetDay.id);
  state.days[i].tasks.push(tskObj);
  setLocalData();
}
