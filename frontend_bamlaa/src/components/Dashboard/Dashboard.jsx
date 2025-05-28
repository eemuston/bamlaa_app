import { useUser } from '../../UserContext'
import CreateWord from '../CreateWord/CreateWord'

const Dashboard = () => {
    const { user, userDispatch } = useUser()

    return (
        <div>
            {user 
            ?
            <div>
                <CreateWord />
            </div> 
            :
            <div>kirjaudu sisään nähdäksesi dashboardin </div>
            }
        </div>
    )
}

export default Dashboard