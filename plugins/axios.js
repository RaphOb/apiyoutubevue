import axios from 'axios'

export default axios.create({
  baseURL: "http://192.168.197.135:8080/api"
})
