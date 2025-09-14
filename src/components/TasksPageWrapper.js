

import React from 'react';
import { useParams } from 'react-router-dom';
import TasksPage from './TasksPage';

function TasksPageWrapper({ allTasks }) {
  const { range } = useParams();

  if (!range || !allTasks.length) {
    return <div>Загрузка...</div>;
  }

  const taskIds = range.split(',').map(id => Number(id));

  const selectedTasks = allTasks.filter(task => taskIds.includes(task.id));

  if (selectedTasks.length === 0) {
    return <div>Нет задач</div>;
  }

  return (
    <TasksPage
      tasks={selectedTasks}
      rangeStart={selectedTasks[0].id}
      rangeEnd={selectedTasks[selectedTasks.length - 1].id}
    />
  );
}

export default TasksPageWrapper;

