export const getPlayers = async () => {
  const response = await fetch('/data/players.json');
  const data = await response.json();
  console.log(data);
  return data.players;
};
