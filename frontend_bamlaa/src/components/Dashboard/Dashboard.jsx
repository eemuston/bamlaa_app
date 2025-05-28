import { useUser } from "../../context/UserContext"
import CreateWord from "../CreateWord/CreateWord"
import HandleSuggestion from "../HandleSuggestion/HandleSuggestion"
import './Dashboard.css'

const Dashboard = () => {
  const { user, userDispatch } = useUser();

  return (
    <div className="DashboardContainer">
      {user ? (
        <div className="DashboardContent">
          <CreateWord />
          <HandleSuggestion />
        </div>
      ) : (
        <div>kirjaudu sisään nähdäksesi dashboardin </div>
      )}
    </div>
  );
};

export default Dashboard;
