import { createContext, Dispatch, useContext, useEffect, useReducer } from 'react';
import { tasksReducer, tasksInitialState, TaskActions, TaskAction } from '../reducers/tasksReducer';
import { Task } from '../types';

interface TasksContextInterface {
  tasks: Task[];
  dispatchTasks: Dispatch<TaskAction>;
}

const TasksContext = createContext<TasksContextInterface>({} as TasksContextInterface);

type TasksProviderProps = {
  children: React.ReactNode;
};

const TasksProvider = ({ children }: TasksProviderProps) => {
  const [tasks, dispatchTasks] = useReducer(tasksReducer, tasksInitialState);

  useEffect(() => {
    const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (tasks) {
      dispatchTasks({ type: TaskActions.SET_TASKS, payload: tasks });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return <TasksContext.Provider value={{ tasks, dispatchTasks }}>{children}</TasksContext.Provider>;
};

const useTasks = () => useContext(TasksContext);

export { TasksProvider, useTasks };
