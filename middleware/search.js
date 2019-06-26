import axios from 'axios'

export default function({params, store}) {
  return axios.get(`http://192.168.56.103:8084/${params}`)
    .then((response) => {
      store.commit('add', response.data.results);
    })
}
