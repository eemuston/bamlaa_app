import { useUser } from '../../UserContext'
import CreateWord from '../CreateWord/CreateWord'
import HandleSuggestion from '../HandleSuggestion/HandleSuggestion'

const Dashboard = () => {
    const { user, userDispatch } = useUser()

    return (
        <div>
            {user 
            ?
            <div>
                <CreateWord />
                <HandleSuggestion />
            </div> 
            :
            <div>kirjaudu sisään nähdäksesi dashboardin </div>
            }
        </div>
    )
}

export default Dashboard