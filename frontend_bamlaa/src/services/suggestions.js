import axios from 'axios'
const baseUrl = '/api/suggestions'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAllSuggestions = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const createSuggestion = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const eraseSuggestion = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAllSuggestions, createSuggestion, eraseSuggestion, setToken }