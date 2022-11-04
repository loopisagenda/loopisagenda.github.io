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

export const state = {
  days: [],
  targetDay: "", //isso é importante para sabermos quais tarefas precisamos renderizar com base no dia clicado pelo usuário
};

export function getData() {
  const dias = [{ day: "04", month: "11", year: "2022" }];

  localStorage.setItem("data", JSON.stringify(dias));

  const dados = JSON.parse(localStorage.getItem("data"));

  state.days = [...dados];
}

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
export function addDay(day, month, year) {}
