import { Reducer } from 'react';
import { Task, TaskList } from '../types';

const tasksInitialState: TaskList = [];

enum TaskActions {
  ADD_TASK = 'ADD_TASK',
  REMOVE_TASK = 'REMOVE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  COMPLETE_TASK = 'COMPLETE_TASK',
  SET_TASKS = 'SET_TASKS',
}

export type TaskAction =
  | {
      type:
        | TaskActions.ADD_TASK
        | TaskActions.REMOVE_TASK
        | TaskActions.UPDATE_TASK
        | TaskActions.COMPLETE_TASK;
      payload: Task;
    }
  | { type: TaskActions.SET_TASKS; payload: Task[] };

const tasksReducer: Reducer<TaskList, TaskAction> = (state, { type, payload }): Task[] => {
  switch (type) {
    case TaskActions.ADD_TASK:
      return [...state, payload];
    case TaskActions.REMOVE_TASK:
      return state.filter((task) => task.id !== payload.id);
    case TaskActions.UPDATE_TASK:
      return state.map((task) => (task.id === payload.id ? payload : task));
    case TaskActions.COMPLETE_TASK:
      return state.map((task) => (task.id === payload.id ? { ...task, isCompleted: true } : task));
    case TaskActions.SET_TASKS:
      return payload;
    default:
      return state;
  }
};

export { tasksReducer, tasksInitialState, TaskActions };
