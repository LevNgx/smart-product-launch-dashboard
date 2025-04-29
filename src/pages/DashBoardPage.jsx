import '../styles/DashBoard.css';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function DashBoardPage() {
  const { allIdeas, filteredIdeas, setFilterStatus, filterStatus, loggedInUser } = useAppContext();
  const navigate = useNavigate();
  // Count each status type from allIdeas (not filtered)
  const submittedCount = allIdeas.filter(idea => idea.status === "Submitted" && idea.userId === loggedInUser.id).length;
  const inProgressCount = allIdeas.filter(idea => idea.status === "In Progress" && idea.userId === loggedInUser.id).length;
  const launchReadyCount = allIdeas.filter(idea => idea.status === "Launch Ready" && idea.userId === loggedInUser.id).length;

  const handleFilter = (status) => {
    if (filterStatus === status) {
      setFilterStatus(""); // toggle off
    } else {
      setFilterStatus(status);
    }
  };

  const clearFilter = () => setFilterStatus("");
  const navigateToSubmitPage = ()  => navigate('/submit-idea')

  return (
    <div className="dashboard-container">
      <h1 className="welcome-heading">Welcome back {loggedInUser && loggedInUser.name} !</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
        
        <button className='idea-button' onClick={navigateToSubmitPage}>Submit new idea!</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button className="clear-button" onClick={clearFilter}>Clear Filter</button>
        
      </div>

      <div className="cards-container">
        <div
          className={`card ideas-submitted ${filterStatus === "Submitted" ? "selected-card" : ""}`}
          onClick={() => handleFilter("Submitted")}
        >
          <p className="card-title">Ideas Submitted</p>
          <p className="card-value">{submittedCount}</p>
        </div>

        <div
          className={`card ideas-in-progress ${filterStatus === "In Progress" ? "selected-card" : ""}`}
          onClick={() => handleFilter("In Progress")}
        >
          <p className="card-title">Ideas In Progress</p>
          <p className="card-value">{inProgressCount}</p>
        </div>

        <div
          className={`card ideas-ready ${filterStatus === "Launch Ready" ? "selected-card" : ""}`}
          onClick={() => handleFilter("Launch Ready")}
        >
          <p className="card-title">Ideas Ready</p>
          <p className="card-value">{launchReadyCount}</p>
        </div>
      </div>

      <div className="recent-ideas">
        <h2 style={{ marginBottom: '20px' }}>Recent Ideas</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Idea Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredIdeas.map((idea, index) => (
              <tr key={index}>
                <td>{idea.title}</td>
                <td>
                  <span
                    className={`status-badge ${
                      idea.status === "Launch Ready"
                        ? "status-launchready"
                        : idea.status === "In Progress"
                        ? "status-inprogress"
                        : "status-submitted"
                    }`}
                  >
                    {idea.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashBoardPage;
