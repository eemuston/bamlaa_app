import WordOfTheDay from "../WordOfTheDay/WordOfTheDay"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <Link to="/quiz">Harjoittelemaan</Link>
            <WordOfTheDay />    
        </div>
    )
}

export default Home