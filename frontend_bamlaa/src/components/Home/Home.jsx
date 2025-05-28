import WordOfTheDay from "../WordOfTheDay/WordOfTheDay"
import { Link } from "react-router-dom"
import './Home.css'

const Home = () => {
    return (
        <div className="homecontainer">
            <Link to="/quiz"><button className="HomeButton">Harjoittelemaan</button></Link>
            <WordOfTheDay />    
        </div>
    )
}

export default Home