import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
})

export const api = {
  get(endpoint) {
    console.log('Services')
    console.log(axiosInstance.get(endpoint))

    return axiosInstance.get(endpoint)
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body)
  },
}
