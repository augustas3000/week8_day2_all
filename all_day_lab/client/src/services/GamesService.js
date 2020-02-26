const baseURL = 'http://localhost:3000/api/games/'

// fetch method wraps the asynchronous functionality of a request inside a promise.
// That means we can write code to handle the result of our request, without having to give too much mind as to when our request is going to finish executing.

export default {
  getGames(){
    // const myFetch = fetch(baseURL)
    // .then(res => res.json())
    // .then(data => console.log(data))



    return fetch(baseURL)
    .then(res => res.json()) // Promise's .then method will be invoked if the promise is resolved, response object will be returned on success and passed to arrow function where it's method json() will be called to convert to js objects so we can access.

  },
  postGame(payload){
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
  },
  deleteGame(id){
    return fetch(baseURL + id, {
      method: 'DELETE'
    })
  }
}
