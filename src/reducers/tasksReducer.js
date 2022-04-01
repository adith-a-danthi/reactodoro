const tasksInitialState = [];

const actionTypes = {
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  COMPLETE_TASK: 'COMPLETE_TASK',
};

const tasksReducer = (state, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_TASK:
      return [...state, payload];
    case actionTypes.REMOVE_TASK:
      return state.filter((task) => task.id !== payload.id);
    case actionTypes.UPDATE_TASK:
      return state.map((task) => (task.id === payload.id ? payload : task));
    case actionTypes.COMPLETE_TASK:
      return state.map((task) => (task.id === payload.id ? { ...task, isCompleted: true } : task));
    default:
      return state;
  }
};

export { tasksReducer, tasksInitialState, actionTypes };
