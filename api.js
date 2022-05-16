export default class Api {
  static fetchGetRequest(path) {
    return fetch(path, {
      method: "GET",

      "Content-Type": "application/json",
      "X-Master-Key": process.env.REACT_APP_TOKEN,
    });
  }

  static fetchPostRequest(path, body) {
    return fetch(path, {
      method: "POST",
      "Content-Type": "application/json",
      "X-Master-Key": process.env.REACT_APP_TOKEN,
      body,
    });
  }
  static fetchPutRequest(path, body) {
    return fetch(path, {
      method: "PUT",
      "Content-Type": "application/json",
      "X-Master-Key": process.env.REACT_APP_TOKEN,
      body,
    });
  }
  static fetchDeleteRequest(path, body) {
    return fetch(path, {
      method: "DELETE",
      "Content-Type": "application/json",
      "X-Master-Key": process.env.REACT_APP_TOKEN,
      body,
    });
  }
}
