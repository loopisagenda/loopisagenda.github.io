export const state = {
  days: [],
};

export function getData() {
  //imagine que essa função tenha ido até o localStorage pegar os dados
  const dados = [
    {
      date: "04/11",
      year: "2022",
      tasks: [],
    },
    {
      date: "05/11",
      year: "2022",
      tasks: [],
    },
  ];

  state.days = [...dados];
}
