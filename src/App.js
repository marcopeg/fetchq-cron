import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import LoadingView from './views/LoadingView';
import LoginView from './views/LoginView';
import TasksList from './views/TasksList';
import CreateTask from './views/CreateTask';
import { useAuth } from './state/use-auth';

export default function App() {
  const { hasChecked, hasAuth } = useAuth();

  if (!hasChecked) {
    return <LoadingView />;
  }

  if (!hasAuth) {
    return <LoginView />;
  }

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={TasksList} />
        <Route path="/new" component={CreateTask} />
      </Switch>
    </Router>
  );
}
