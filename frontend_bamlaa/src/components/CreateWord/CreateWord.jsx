import { useState } from "react"
import wordService from "../../services/words"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSetNotification } from "../../context/NotificationContext"
import './CreateWord.css'

const CreateWord = () => {
  const queryClient = useQueryClient()
  const dispatch = useSetNotification()
  const [newWord, setNewWord] = useState("")
  const [newTranslation, setNewTranslation] = useState("")
  const [newUsage, setNewUsage] = useState("")

  const newWordMutation = useMutation({
    mutationFn: wordService.create,
    onSuccess: (newWord) => {
      const words = queryClient.getQueryData(["words"]) || []
      queryClient.setQueryData(["words"], words.concat(newWord))
      dispatch("CUSTOM", {
        message: `Uusi slangisana: ${newWord.word} lisätty!`,
        color: "green",
      })
      setNewWord("")
      setNewTranslation("")
      setNewUsage("")
    },
    onError: (error) => {
      dispatch("CUSTOM", {
        message: `Sanan lisääminen epäonnistui!`,
        color: "red",
      })
    },
  })

  const addWord = (event) => {
    event.preventDefault()
    newWordMutation.mutate({
      word: newWord,
      translation: newTranslation,
      usage: newUsage,
    })
  }

  return (
    <div className="CreateWordContainer">
      <h2 className="Wordtitle">Lisää uusi sana tietokantaan</h2>
      <form onSubmit={addWord}>
        <div>
          <label>
            Slangisana:
            <input
              className="WordInput"
              name="word"
              value={newWord}
              onChange={(event) => setNewWord(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Käännös:
            <input
              className="WordInput"
              name="translation"
              value={newTranslation}
              onChange={(event) => setNewTranslation(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Käyttöesimerkki:
            <textarea
              className="WordTextarea"
              name="usage"
              value={newUsage}
              onChange={(event) => setNewUsage(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">Tallenna</button>
      </form>
    </div>
  )
}

export default CreateWord
