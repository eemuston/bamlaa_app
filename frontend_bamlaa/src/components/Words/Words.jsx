import { useQuery } from "@tanstack/react-query"
import wordService from "../../services/words"
import './Words.css'

const Words = () => {
    const result = useQuery({
        queryKey: ["words"],
        queryFn: wordService.getAll,
        retry: 1,
    })

    if (result.isLoading) {
      return <div>Loading data...</div>
    }
  
    if (result.isError) {
      return <div>Voe rähmän käpälä, vuan joku män rikki!</div>
    }

    const words = result.data

    words.sort((a, b) => a.word.localeCompare(b.word))

    return (
        <div className="WordsContainer">
            <h1 className="WordsTitle">Sanasto</h1>
            <div className="WordsCells">
                <div className="HeaderRow"><div className="HeaderCell">Slangisana</div><div className="HeaderCell">Käännös</div><div className="HeaderCell">Käyttöesimerkki</div></div>
                {words.map((word) => (
                    <div className="Words"> 
                        <div className="WordsCell">{word.word}</div> <div className="WordsCell">{word.translation}</div> <div className="WordsCell">{word.usage && word.usage}</div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Words