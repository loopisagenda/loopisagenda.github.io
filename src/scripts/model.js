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

export function getFormattedDateUSA(date) {
  return `${date.substr(5, 2)}/${date.substr(8, 2)}/${date.substr(0, 4)}`;
}

export function getFormattedDateBRA(date) {
  return `${date.substr(8, 2)}/${date.substr(5, 2)}/${date.substr(0, 4)}`;
}

export function getData() {
  const testData = `[{"day":"04","month":"11","year":"2022"}]`;
  const data = [...((JSON.parse(localStorage.getItem("data") ?? testData)))];
  localStorage.setItem("data", JSON.stringify(data));
  state.days = data;
}

export function addDay(stringDate) {
  const date = new Date(getFormattedDateUSA(stringDate));
  const newDay = {
    id: uuid(),
    day: date.getDate(),
    month: date.getMonth()+1,
    year: date.getFullYear(),
    tasks: [],
  }
  getData();
  state.days = [
    ...state.days,
    newDay,
  ];
  localStorage.setItem("data", JSON.stringify(state.days));
}

export function getDiffDays(date1, date2Data) {
  const date2 = new Date(`${date2Data.month}/${date2Data.day}/${date2Data.year}`);
  const diffTime = (date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getDiffProp(date) {
  const currentDate = new Date();
  const diffDays = getDiffDays(currentDate, date);
  if(diffDays == 0) {
    return "Hoje";
  } else if(diffDays == 1) {
    return "Amanhã";
  } else if(diffDays == -1) {
    return "Ontem";
  } else if(diffDays < 0) {
    return `${-diffDays} dias atrás`;
  }
  return `Daqui a ${diffDays} dias`;
}
