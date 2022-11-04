import { v4 as uuid } from "uuid";

//Estrtutura de days
// const days: [
//   {
//     id: "",
//     day: "",
//     month: "",
//     year: "",
//     diff: "", e.g Hoje
//     tasks: [
//       {
//         id: ""
//         title: "",
//         description: "",
//       }
//     ]
//   }
// ]

/**
 * Recebe dia mês e ano do dia a ser criado e gera um id aleatório para ele antes de inserí-lo no estado
 * @param {string} day dia em questão
 * @param {string} month mês em questão
 * @param {string} year ano em questão
 * @todo criar um objeto com as seguintes propriedades:
 *  - id: string
 *  - day: string;
 *  - month: string;
 *  - year: string;
 *  - tasks: array;
 * @todo adicionar no estado o objeto, que no caso é o dia criado;
 * @todo o day, month e year do objeto devem receber os que foram passados como parâmetros da função
 * @todo o id deve ser aleatório, para gerá-lo utilize uuid();
 *
 */

export const state = {
  days: [],
  targetDay: "", //isso é importante para sabermos quais tarefas precisamos renderizar com base no dia clicado pelo usuário
};

function setLocalData() {
  localStorage.setItem("data", JSON.stringify(state.days));
}

function getFormattedDateUSA(date) {
  return `${date.substr(5, 2)}/${date.substr(8, 2)}/${date.substr(0, 4)}`;
}

function getFormattedDateBRA(date) {
  return `${date.substr(8, 2)}/${date.substr(5, 2)}/${date.substr(0, 4)}`;
}

function getDiffDays(date1, date2Data) {
  const date2 = new Date(
    `${date2Data.month}/${date2Data.day}/${date2Data.year}`
  );

  const diffTime = date2 - date1;
  const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
  return diffDays;
}

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

export function getData() {
  const data = JSON.parse(localStorage.getItem("data")) || "";
  if (data != "") {
    state.days = data;
    state.days.forEach((day) => (day.diff = getDiffProp(day)));
  }
}

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

export function removeDay(dayId) {
  state.days = state.days.filter((day) => day.id != dayId);
  setLocalData();
}
