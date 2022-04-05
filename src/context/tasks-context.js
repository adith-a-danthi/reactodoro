import { createContext, useContext, useEffect, useReducer } from 'react';
import { tasksReducer, tasksInitialState } from '../reducers/tasksReducer';

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
  const [tasks, dispatchTasks] = useReducer(tasksReducer, tasksInitialState);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
      dispatchTasks({ type: 'SET_TASKS', payload: tasks });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return <TasksContext.Provider value={{ tasks, dispatchTasks }}>{children}</TasksContext.Provider>;
};

const useTasks = () => useContext(TasksContext);

export { TasksProvider, useTasks };
