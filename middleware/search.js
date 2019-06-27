import axios from 'axios'

export default function({query}) {
  return axios.get(`192.168.56.103:8084/${query}`)
    .then((response) => {
      store.commit('add', response.data.results);
    });
}
