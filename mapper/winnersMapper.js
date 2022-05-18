import Winner from "../DTO/Winner.js";

export const JSONtoDTO = (json) => {
  return json.winners.map((winner) => new Winner(winner.name, winner.time));
};

export const DTOArrToJSON = (winnersDTO) => {
  return JSON.stringify({
    winners: winnersDTO.map((winner) => winner.toObject()),
  });
};
