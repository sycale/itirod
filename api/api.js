const host = process.env.REACT_APP_HOST || 'localhost',
const port = process.env.REACT_APP_PORT || "8000";
const url = `${host}:${port}`

export const storageModule = {
  fetchGetTestById: (testId) => {
    return fetch(url + '/api/test/' + testId, {
      method: "GET"
    })
  },
  addTest: (testBody) => {
    return fetch(url + '/api/test', {
      method: "PUT",
      body: JSON.stringify(testBody)
    })
  }
};
