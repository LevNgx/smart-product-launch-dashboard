
import '../styles/DashBoard.css';

function DashBoardPage() {
  const recentIdeas = [
    { name: "Smartwatch 2.0", status: "In Progress" },
    { name: "Flying Drone X", status: "Launch Ready" },
    { name: "AI-powered Bike", status: "In Progress" },
  ];

  return (
    <div className="dashboard-container">
      
      <h1 className="welcome-heading">Welcome back to LaunchPad!</h1>

      <div className="cards-container">
              <div className="card ideas-submitted">
                  <p>Ideas Submitted</p>
                  <p>3</p>
              </div>

              <div className="card ideas-ready">
                  <p>Ideas Ready</p>
                  <p>7</p>
              </div>

              <div className="card ideas-in-progress">
                  <p>Ideas In Progress</p>
                  <p>2</p>
              </div>
      </div>

      <div className="recent-ideas">
        <h2 style={{marginBottom: '20px'}}>Recent Ideas</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Idea Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentIdeas.map((idea, index) => (
              <tr key={index}>
                <td>{idea.name}</td>
                <td>
                  <span className={`status-badge ${
                    idea.status === "Launch Ready" ? "status-launchready" : "status-inprogress"
                  }`}>
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
