import Api from "./api.js";

export default class JSONDataAPI extends Api {
  static fetchGetWinners() {
    const path = "https://api.jsonbin.io/b/62829d2425069545a3391d4a/2";

    return this.fetchGetRequest(path);
  }

  static fetchUpdateWinners(winners) {
    const path = "https://api.jsonbin.io/v3/b/62829d2425069545a3391d4a";

    return this.fetchPutRequest(path, winners);
  }

  static fetchDeleteWinners() {
    const path = "https://api.jsonbin.io/v3/b/62829d2425069545a3391d4a";

    return this.fetchDeleteRequest(path);
  }
}
