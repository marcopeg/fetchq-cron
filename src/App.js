import React from 'react';
import './styles.css';

import { useAuth } from './state/use-auth';

export default function App() {
  const { hasAuth, isLoading } = useAuth();
  // console.log('auth:', hasAuth);
  return (
    <div className="App">
      <h1>Fetchq Cron</h1>
      <h2>Schedule tasks like a king!</h2>
      <p>{hasAuth ? 'auth' : 'no auth'}</p>
      <p>{isLoading ? 'loading...' : null}</p>
    </div>
  );
}
