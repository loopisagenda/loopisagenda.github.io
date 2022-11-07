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

//gera uma propriedade sumSort para ordenamento do array
function generateSumSort(day, month, year) {
  const strDay = String(day).padStart(2, "0");
  const strMonth = String(month).padStart(2, "0");
  const strYear = String(year).padStart(2, "0");

  const strSumSort = String(strYear + strMonth + strDay);

  const sumSort = Number(strSumSort);

  return sumSort;
}

//pega a data do localStorage no primeiro carregamento caso exista
export function getData() {
  const data = JSON.parse(localStorage.getItem("data")) || "";
  if (data != "") {
    state.days = data;
    state.days.forEach((day) => (day.diff = getDiffProp(day)));
  }
}

//ordena os dias
function sortDays() {
  state.days.sort((a, b) => a.sumSort.toString().localeCompare(b.sumSort));
}

//recebe uma data no formato yyyy-mm-d, separa em propiedades, gera um id aleatório para o dia e o adiciona no estado
export function addDay(stringDate) {
  //tira a duplicação de dias na aba dias de tarefas
  let duplicated;

  const date = new Date(getFormattedDateUSA(stringDate));

  const newDay = {
    id: uuid(),
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    sumSort: generateSumSort(
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear()
    ),
    diff: getDiffProp({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    }),
    tasks: [],
  };

  state.days.forEach((day) => {
    if (
      day.day == newDay.day &&
      day.month == newDay.month &&
      day.year == newDay.year
    ) {
      duplicated = true;
    }
  });

  if (!duplicated) {
    state.days = [...state.days, newDay];
    sortDays();
    setLocalData();
  } else {
    alert("Um dia com esta data já existe");
  }
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

//remove uma tarefa
export function deleteTask(taskId) {
  let dayIndex, dayId;

  state.days.forEach((day, dayi) => {
    day.tasks.forEach((task) => {
      if (task.id == taskId) {
        dayIndex = dayi;
        dayId = day.id;
      }
    });
  });

  state.days[dayIndex].tasks = state.days[dayIndex].tasks.filter(
    (task) => task.id != taskId
  );

  setTargetDay(dayId);
  setLocalData();
}

//o processo de editar task na vedade é deletar a tarefa e recriá-la
export function editTask(
  newTaskTitle,
  newTaskDescription,
  newTaskDate,
  taskId
) {
  deleteTask(taskId);
  let duplicated = false;

  //separa a string newTaskDate em variáveis
  const date = new Date(getFormattedDateUSA(newTaskDate));
  const newDay = date.getDate();
  const newMonth = date.getMonth() + 1;
  const newYear = date.getFullYear();

  //verifica se a nova data é um dia já existente e adiciona a tarefa naquele dia
  state.days.forEach((day) => {
    if (day.day == newDay && day.month == newMonth && day.year == newYear) {
      duplicated = true;
      setTargetDay(day.id);
      addTask(newTaskTitle, newTaskDescription);
    }
  });

  //se o dia ainda nao existir, será preciso criar um novo dia. A diferença para a função addDay é que aqui já haverá uma tarefa em tasks
  if (!duplicated) {
    const date = new Date(getFormattedDateUSA(newTaskDate));

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
      sumSort: generateSumSort(
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear()
      ),
      tasks: [
        {
          title: newTaskTitle,
          description: newTaskDescription,
          id: taskId, //não é criado um novo id. O id antigo é reaproveitado
        },
      ],
    };
    state.days = [...state.days, newDay];
    setTargetDay(newDay.id);
    sortDays();
    setLocalData();
  }
}
