import { useTasks } from '../context/tasks-context';
import { actionTypes } from '../reducers/tasksReducer';

export default function TaskItem({ task, showEditModal }) {
  const { dispatchTasks } = useTasks();

  return (
    <li className="list-group-item justify-space-between">
      <p className={`text-md font-weight-bold ${task.isCompleted ? 'completed-task' : ''}`}>
        {task.title}
      </p>
      <div className="flex gap-1">
        <button className="btn fab small-fab btn-secondary" onClick={() => showEditModal(task)}>
          <i className="fas fa-edit"></i>
        </button>
        <button
          className="btn fab small-fab btn-secondary"
          onClick={() => dispatchTasks({ type: actionTypes.REMOVE_TASK, payload: task })}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </li>
  );
}
