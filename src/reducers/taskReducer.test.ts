import { TaskList } from '../types';
import { TaskAction, TaskActions, tasksInitialState, tasksReducer } from './tasksReducer';

describe('taskReducer', () => {
  test('Update tasks list state with new value', () => {
    const action: TaskAction = {
      type: TaskActions.SET_TASKS,
      payload: [
        {
          id: '1',
          title: 'Test task',
          description: 'Test description',
          isCompleted: false,
          duration: 10,
        },
      ],
    };

    const expectedState: TaskList = [
      {
        id: '1',
        title: 'Test task',
        description: 'Test description',
        isCompleted: false,
        duration: 10,
      },
    ];

    const state = tasksReducer(tasksInitialState, action);
    expect(state).toEqual(expectedState);
  });

  test('Add new task to tasks list', () => {
    const action: TaskAction = {
      type: TaskActions.ADD_TASK,
      payload: {
        id: '1',
        title: 'Test task',
        description: 'Test description',
        isCompleted: false,
        duration: 10,
      },
    };

    const expectedState: TaskList = [
      {
        id: '1',
        title: 'Test task',
        description: 'Test description',
        isCompleted: false,
        duration: 10,
      },
    ];

    const state = tasksReducer(tasksInitialState, action);
    expect(state).toEqual(expectedState);
  });

  test('Remove task from tasks list', () => {
    const initialState: TaskList = [
      {
        id: '1',
        title: 'Test task',
        description: 'Test description',
        isCompleted: false,
        duration: 10,
      },
      {
        id: '2',
        title: 'Test task 2',
        description: 'Test description',
        isCompleted: false,
        duration: 15,
      },
    ];

    const action: TaskAction = {
      type: TaskActions.REMOVE_TASK,
      payload: {
        id: '1',
        title: 'Test task',
        description: 'Test description',
        isCompleted: false,
        duration: 10,
      },
    };

    const expectedState: TaskList = [
      {
        id: '2',
        title: 'Test task 2',
        description: 'Test description',
        isCompleted: false,
        duration: 15,
      },
    ];

    const state = tasksReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  test('Update task in tasks list', () => {
    const initialState: TaskList = [
      {
        id: '1',
        title: 'Test task',
        description: 'Test description',
        isCompleted: false,
        duration: 10,
      },
      {
        id: '2',
        title: 'Test task 2',
        description: 'Test description',
        isCompleted: false,
        duration: 15,
      },
    ];

    const action: TaskAction = {
      type: TaskActions.UPDATE_TASK,
      payload: {
        id: '1',
        title: 'Test task',
        description: 'Updated Description',
        isCompleted: false,
        duration: 15,
      },
    };

    const expectedState: TaskList = [
      {
        id: '1',
        title: 'Test task',
        description: 'Updated Description',
        isCompleted: false,
        duration: 15,
      },
      {
        id: '2',
        title: 'Test task 2',
        description: 'Test description',
        isCompleted: false,
        duration: 15,
      },
    ];

    const state = tasksReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  test('Complete task in tasks list', () => {
    const initialState: TaskList = [
      {
        id: '1',
        title: 'Test task',
        description: 'Test description',
        isCompleted: false,
        duration: 10,
      },
      {
        id: '2',
        title: 'Test task 2',
        description: 'Test description',
        isCompleted: false,
        duration: 15,
      },
    ];

    const action: TaskAction = {
      type: TaskActions.COMPLETE_TASK,
      payload: {
        id: '1',
        title: 'Test task',
        description: 'Test description',
        isCompleted: false,
        duration: 10,
      },
    };

    const expectedState: TaskList = [
      {
        id: '1',
        title: 'Test task',
        description: 'Test description',
        isCompleted: true,
        duration: 10,
      },
      {
        id: '2',
        title: 'Test task 2',
        description: 'Test description',
        isCompleted: false,
        duration: 15,
      },
    ];

    const state = tasksReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
});
