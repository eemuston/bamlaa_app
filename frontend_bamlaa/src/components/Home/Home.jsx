import WordOfTheDay from "../WordOfTheDay/WordOfTheDay"
import CreateSuggestion from "../CreateSuggestion/CreateSuggestion"
import { Link } from "react-router-dom"
import './Home.css'

const Home = () => {
    return (
        <div className="homewrapper">
            <div className="homecontainer">
                <Link to="/quiz"><button className="HomeButton">Harjoittelemaan</button></Link>
                <WordOfTheDay />    
            </div>
            <CreateSuggestion />
        </div>
    )
}

export default Home