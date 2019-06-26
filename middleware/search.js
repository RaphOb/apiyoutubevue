import axios from 'axios'

export default function({params, store}) {
  return axios.get(`http://192.168.197.134:8084/${params}`)
    .then((response) => {
      store.commit('add', response.data.results);
    })
}
