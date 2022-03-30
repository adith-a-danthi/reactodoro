import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { TasksProvider } from './context/tasks-context';

ReactDOM.render(
  <React.StrictMode>
    <TasksProvider>
      <Router>
        <App />
      </Router>
    </TasksProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
