import { useState } from 'react';
import { Navbar, TaskItem, Modal } from '../components';
import { useTasks } from '../context/tasks-context';
import { Task } from '../types';

export default function Home() {
  const modalInitialState = {
    showModal: false,
    modelTask: {} as Task,
    editModal: false,
  };
  // Hooks
  const [modelState, setModelState] = useState(modalInitialState);
  const { tasks } = useTasks();

  const { showModal, modelTask, editModal } = modelState;

  // Handlers
  const setShowModal = (value: boolean) =>
    setModelState((state) => ({ ...state, showModal: value }));
  const showEditModal = (task: Task) =>
    setModelState({ showModal: true, modelTask: task, editModal: true });

  return (
    <div>
      <main className="content">
        <Navbar />

        <h1 className="heading-2 text-white">Welcome</h1>
        <p className="text-lg text-white">Beat procrastination one pomodoro at a time</p>

        <section className="card my-8 pa-6 rounded-lg fill-height">
          <div className="flex justify-space-between align-items-center">
            <h3 className="heading-3">To-Do List</h3>
            <button
              className="btn fab btn-gray"
              onClick={() => setModelState({ ...modalInitialState, showModal: true })}>
              <i className="fas fa-plus"></i>
            </button>
          </div>

          {/* Task List */}
          <ul className="list-group list-separators ma-4 mt-6">
            {tasks.map((task: Task) => (
              <TaskItem key={task.id} task={task} showEditModal={showEditModal} />
            ))}
          </ul>
        </section>
      </main>
      {showModal && <Modal setShowModal={setShowModal} task={modelTask} editModal={editModal} />}
    </div>
  );
}
