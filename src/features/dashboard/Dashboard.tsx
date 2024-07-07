import TableHeaderUsers from '../../ui/table/TableHeaderUsers';
import DashboardTaskListTable from './DashboardTaskListTable';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard__top d-flex align-center justify-between mb-20">
        <div className="dashboard__top--actions"></div>
        <h1 className="dashboard__top--title">Welcome Back Ali Brian</h1>
        <div className="dashboard__top--actions d-flex align-center justify-end">
          <span className="dashboard-user">User</span>
          <TableHeaderUsers sourceType="lead" />
        </div>
      </div>
      <div className="dashboard__body">
        <div className="dashboard__row">
          <div className="dashboard__col">
            <div className="dashboard__analysis analysis-dashboard">
              <div className="analysis-dashboard__header">
                <div className="analysis-dashboard__title text-center">
                  What is waiting for you
                </div>
              </div>
              <div className="analysis-dashboard__items d-flex align-center justify-between">
                <div className="analysis-dashboard__item">
                  <span>12</span>
                  <p>New leads</p>
                </div>
                <div className="analysis-dashboard__item">
                  <span>3</span>
                  <p>Quoted</p>
                </div>
                <div className="analysis-dashboard__item">
                  <span>2</span>
                  <p>Posted</p>
                </div>
                <div className="analysis-dashboard__item">
                  <span>2</span>
                  <p>Pickup today</p>
                </div>
              </div>
              <hr />
              <div className="analysis-dashboard__items d-flex align-center justify-between">
                <div className="analysis-dashboard__item">
                  <span>12</span>
                  <p>Delivery today</p>
                </div>
                <div className="analysis-dashboard__item">
                  <span>3</span>
                  <p>Late PU/DEL</p>
                </div>
                <div className="analysis-dashboard__item">
                  <span>2</span>
                  <p>New email</p>
                </div>
                <div className="analysis-dashboard__item">
                  <span>2</span>
                  <p>Updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard__row">
          <div className="dashboard__col">
            <div className="dashboard__analysis analysis-dashboard">
              <div className="analysis-dashboard__header">
                <div className="analysis-dashboard__title text-center">
                  Task list for today
                </div>
              </div>
              <DashboardTaskListTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
