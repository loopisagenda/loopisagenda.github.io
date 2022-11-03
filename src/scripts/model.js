export const state = {
  days: [],
};

export function getData() {
  //imagine que essa função tenha ido até o localStorage pegar os dados
  const dados = JSON.parse(localStorage.getItem("@data")).data;

  state.days = [...dados];
}
