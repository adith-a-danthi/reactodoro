import { createContext, useContext, useReducer } from 'react';
import { tasksReducer, tasksInitialState } from '../reducers/tasksReducer';

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
  const [tasks, dispatchTasks] = useReducer(tasksReducer, tasksInitialState);

  return <TasksContext.Provider value={{ tasks, dispatchTasks }}>{children}</TasksContext.Provider>;
};

const useTasks = () => useContext(TasksContext);

export { TasksProvider, useTasks };
