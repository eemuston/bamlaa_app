import { useQuery } from "@tanstack/react-query"
import wordService from "../../services/words"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Quiz = () => {
    const navigate = useNavigate()
    const result = useQuery({
        queryKey: ["words"],
        queryFn: wordService.getAll,
        retry: 1,
    })

    const [currentWord, setCurrentWord] = useState(null)
    const [options, setOptions] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState("")
    const [answerFeedback, setAnswerFeedback] = useState("")
    const [hasAnswered, setHasAnswered] = useState(false)
    const [round, setRound] = useState(1)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [remainingWords, setRemainingWords] = useState([])
    const [gameFinished, setGameFinished] = useState(false)
    
    
    useEffect(() => {
        if (result.data) {
            setRemainingWords([...result.data])
        }
    }, [result.data])

    useEffect(() => {
        if (remainingWords.length > 0 && !currentWord) {
            generateQuestion()
        }
    }, [remainingWords])


    const generateQuestion = () => {
        console.log(remainingWords.length)
        if (round > 9) {
            setGameFinished(true)
            return
        }
        
        const randomIndex = Math.floor(Math.random() * remainingWords.length)
        const word = remainingWords[randomIndex]
        
        let answers = [word.translation]
        while (answers.length < 4) {
            const randomWord = result.data[Math.floor(Math.random() * result.data.length)].translation
            if (!answers.includes(randomWord)) {
                answers.push(randomWord)
            }
        }
        
        answers = answers.sort(() => Math.random() - 0.5)
        setRemainingWords(remainingWords.filter((_, i) => i !== randomIndex))
        setCurrentWord(word)
        setOptions(answers)
        setSelectedAnswer("")
        setAnswerFeedback("")
        setHasAnswered(false)
    }
    
    const handleAnswerClick = (answer) => {
        if (hasAnswered) return
        setSelectedAnswer(answer)
        setHasAnswered(true)
        
        const isCorrect = answer === currentWord.translation
        const feedback = isCorrect
        ? "Oikein!"
        : `Väärin! Oikea vastaus oli "${currentWord.translation}".`
        
        const usageInfo = currentWord.usage
        ? `\nEsimerkki: ${currentWord.usage}`
        : ""
        
        setAnswerFeedback(`${feedback}${usageInfo}`)
        
        if (isCorrect) {
            setCorrectAnswers((prev) => prev + 1)
        }
    }
    
    const handleNextClick = () => {
        if (round < 10) {
            setRound(round + 1)
        }
        generateQuestion()
    }
    
    const handleFinish = () => {
        navigate("/")
    }
    
    if (result.isLoading) {
      return <div>Loading data...</div>
    }
  
    if (result.isError) {
      return <div>Voe rähmän käpälä, vuan joku män rikki!</div>
    }
    
    if (!currentWord) return <div>Loading question...</div>
    
    return (
        <div className="container">
      <h1>HarjoitusBeli</h1>
      <h2>Kierros {round} / 10</h2>
      <h3>Mitä tarkoittaa: "{currentWord.word}"?</h3>

      <div className="feedback">{answerFeedback}</div>

      {!gameFinished ? (
          <ul className="options-grid">
          {options.map((option, index) => (
            <li
              key={index}
              className={`option-item ${
                selectedAnswer === option
                  ? option === currentWord.translation
                    ? "correct"
                    : "wrong"
                  : ""
              } ${hasAnswered ? "disabled" : ""}`}
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="finish">Peli päättyi! Pisteesi: {correctAnswers} / 10</h2>
      )}

      {!gameFinished ? (
        <button onClick={handleNextClick} disabled={!hasAnswered}>
          Seuraava
        </button>
      ) : (
        <button onClick={handleFinish}>Lopeta</button>
      )}
    </div>
  )
}

export default Quiz