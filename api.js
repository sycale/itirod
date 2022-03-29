export default class Api {
  static fetchGetRequest(path) {
    return fetch(path, {
      method: "GET",
    });
  }

  static fetchPostRequest(path, body) {
    return fetch(path, {
      method: "POST",
      body,
    });
  }
}
