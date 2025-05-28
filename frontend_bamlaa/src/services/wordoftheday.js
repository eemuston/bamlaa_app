import axios from 'axios'
const baseUrl = '/api/words/wordOfTheDay'

const getWordOfTheDay = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getWordOfTheDay }