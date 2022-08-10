import { useState } from 'react';
import { useTasks } from '../context/tasks-context';
import { actionTypes } from '../reducers/tasksReducer';
import { v4 as uuidV4 } from 'uuid';
import { Task } from '../types';

type ModalProps = {
  setShowModal: (showModal: boolean) => void;
  task: Task;
  editModal: boolean;
};

export default function Modal({ setShowModal, task, editModal }: ModalProps) {
  const [newTask, setNewTask] = useState(task);
  const { dispatchTasks } = useTasks();

  const formHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const durationHandler = (type: string) => {
    const newValue = newTask.duration + (type === 'add' ? 1 : -1) || 1;
    setNewTask({ ...newTask, duration: newValue });
  };

  const submitHandler = () => {
    editModal
      ? dispatchTasks({ type: actionTypes.UPDATE_TASK, payload: newTask })
      : dispatchTasks({ type: actionTypes.ADD_TASK, payload: { ...newTask, id: uuidV4() } });
    setShowModal(false);
  };

  return (
    <section className="modal-window is-active">
      <div className="modal ma-0 rounded-lg flat">
        {/* Header */}
        <div className="flex gap-2 justify-space-between align-items-center">
          <h4 className="heading-4">Add New Task</h4>
          <button className="btn fab small-fab btn-secondary" onClick={() => setShowModal(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex flex-col gap-1 my-4">
          {/* Title */}
          <label>
            <p className="text-sm font-weight-bold">Title</p>
            <input
              type="text"
              className="input"
              name="title"
              value={newTask.title}
              onChange={formHandler}
            />
          </label>

          {/* Description */}
          <label>
            <p className="text-sm font-weight-bold">Description</p>
            <textarea
              className="input"
              name="description"
              value={newTask.description}
              onChange={formHandler}
            />
          </label>

          {/* Duration */}
          <label className="label">
            <p className="text-sm font-weight-bold">Duration</p>
            <div className="flex gap-1">
              <button className="btn btn-gray rounded-sm" onClick={() => durationHandler('sub')}>
                <i className="fas fa-minus"></i>
              </button>
              <input
                type="text"
                className="input text-center"
                disabled
                name="duration"
                value={newTask.duration}
              />
              <button className="btn btn-gray rounded-sm" onClick={() => durationHandler('add')}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </label>
        </div>
        <hr />

        {/* Action Buttons */}
        <div className="flex gap-1 justify-end mt-8">
          <button className="btn btn-secondary rounded-sm" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="btn btn-gray rounded-sm" onClick={submitHandler}>
            Save
          </button>
        </div>
      </div>
    </section>
  );
}
