import axios from 'axios'

export default function({query}) {
  return axios.get(`localhost/ETNA/API/public/${query}`)
    .then((response) => {
      store.commit('add', response.data.results);
    });
}
