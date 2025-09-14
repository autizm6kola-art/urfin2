import './styles/styles.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MenuPage from './components/MenuPage';
import TasksPageWrapper from './components/TasksPageWrapper';

function App() {
  const [allTasks, setAllTasks] = useState([]);

  // Загрузка JSON при старте
  useEffect(() => {
    fetch('/tasks_urfin.json')
      .then((res) => res.json())
      .then((data) => setAllTasks(data))
      .catch(console.error);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MenuPage allTasks={allTasks} />}
        />
        <Route
          path="/tasks/:range"
          element={<TasksPageWrapper allTasks={allTasks} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
