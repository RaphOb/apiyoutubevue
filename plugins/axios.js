import axios from 'axios'

export default axios.create({
  baseURL: "http://192.168.197.134:8080/api"
})
