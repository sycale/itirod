import Api from "./api";

export default class JSONDataAPI extends Api {
  static getWinners() {
    const path = "https://api.jsonbin.io/b/62829d2425069545a3391d4a";

    return this.fetchGetRequest(path);
  }

  static publishWinners(winners) {
    const path = "https://api.jsonbin.io/v3/b/62829d2425069545a3391d4a";

    return this.fetchPutRequest(path, JSON.stringify({ winners }));
  }

  static deleteWinners() {
    const path = "https://api.jsonbin.io/v3/b/62829d2425069545a3391d4a";

    return this.fetchDeleteRequest(path);
  }
}
