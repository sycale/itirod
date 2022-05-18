import JSONDataAPI from "./api/jsonDataAPI.js";
import Winner from "./DTO/Winner.js";
import { DTOArrToJSON, JSONtoDTO } from "./mapper/winnersMapper.js";

const winner1 = new Winner("Alex", "01.00.33");
const winner2 = new Winner("qwe", "00.00.33");

const getWinners = async () => {
  const data = await JSONDataAPI.fetchGetWinners();

  const json = await data.json();

  return JSONtoDTO(json);
};

const publishWinners = async (winners) => {
  const dataToSend = DTOArrToJSON(winners);

  const data = await JSONDataAPI.fetchUpdateWinners(dataToSend);

  const json = await data.json();

  return JSONtoDTO(json.record);
};

console.log(await publishWinners([winner1, winner2]));

console.log(await getWinners());
