import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import LoadingView from './views/LoadingView';
import LoginView from './views/LoginView';
import TasksList from './views/TasksList';
import CreateTask from './views/CreateTask';
import EditTask from './views/EditTask';
import TaskDetailsView from './views/TaskDetailsView';
import SecretAlert from './containers/SecretAlert';
import { useAuth } from './state/use-auth';
import AppBar from './containers/AppBar';

export default function App() {
  const { hasChecked, hasAuth, errorMsg } = useAuth();

  // Show a hard error in case the network is not available
  // -- this is likely a CORS error --
  if (errorMsg === 'network') {
    return (
      <div style={{ padding: 20 }}>
        <h4>
          <span role="img" aria-label="error">
            ⛔️
          </span>{' '}
          Fetchq CRON
        </h4>
        <p>
          There seems to be a network problem.
          <br />
          <small>
            (open your <em>DevTools</em> to get more details)
          </small>
        </p>
      </div>
    );
  }

  if (!hasChecked) {
    return <LoadingView />;
  }

  if (!hasAuth) {
    return <LoginView />;
  }

  return (
    <Router>
      <SecretAlert />
      <AppBar />
      <Switch>
        <Route path="/" exact component={TasksList} />
        <Route path="/tasks/new" component={CreateTask} />
        <Route path="/task/:groupName/:taskName/edit" component={EditTask} />
        <Route path="/task/:groupName/:taskName/" component={TaskDetailsView} />
      </Switch>
    </Router>
  );
}
