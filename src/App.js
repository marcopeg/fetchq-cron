import React from 'react';
import LoadingView from './views/LoadingView';
import LoginView from './views/LoginView';
import { useAuth } from './state/use-auth';

export default function App() {
  const { hasChecked, hasAuth } = useAuth();
  console.log('?', hasChecked, hasAuth);

  if (!hasChecked) {
    return <LoadingView />;
  }

  if (!hasAuth) {
    return <LoginView />;
  }

  return (
    <div className="App">
      <h1>Fetchq Cron</h1>
      <h2>Schedule tasks like a king!</h2>
    </div>
  );
}
