const host = process.env.REACT_APP_HOST || "http://localhost";
const port = process.env.REACT_APP_PORT || "8000";
const url = `${host}:${port}`;

export default class Api {
  static fetchGetTestById(testId) {
    return fetch(url + "/api/test/" + testId, {
      method: "GET",
    });
  }
  static addTest(testBody) {
    return fetch(url + "/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testBody),
    });
  }
}
