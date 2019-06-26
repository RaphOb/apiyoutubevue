import axios from 'axios'

export default function({query}) {
  return axios.get(`http://192.168.197.134:8084/${query}`)
    .then((response) => {
      store.commit('add', response.data.results);
    });
}
