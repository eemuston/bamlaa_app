import wordoftheday from "../../services/wordoftheday"
import { useQuery } from "@tanstack/react-query"

const WordOfTheDay = () => {
    const result = useQuery({
        queryKey: ["wordoftheday"],
        queryFn: wordoftheday.getWordOfTheDay,
        retry: 1,
    })

     if (result.isLoading) {
        return <div> loading data.... </div>
    }
    if (result.isError) {
        return <div>Voe rähmän käpälä, vuan joku män rikki!</div>
    }

    const wordOfTheDay = result.data
    return (
        <div>
            <h2>Päivän sana</h2>
            <h3>{wordOfTheDay.word}</h3>
            <p>{wordOfTheDay.translation}</p>
            <p>"{wordOfTheDay.usage}"</p>
        </div>
    )
}

export default WordOfTheDay