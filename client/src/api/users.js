import { get } from './api'

export const fetchUsers = () => {
  get('/users')
    .then(data => data.json())
    .then(data => console.log(data))
}