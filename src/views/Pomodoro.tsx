import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Navbar } from '../components';
import { useTasks } from '../context/tasks-context';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Task } from '../types';
import { TaskActions } from '../reducers/tasksReducer';

export default function Pomodoro() {
  const { tasks, dispatchTasks } = useTasks();
  const { id } = useParams();

  const defaultTask: Task = {
    id: '',
    title: '',
    isCompleted: false,
    duration: 0,
    description: '',
  };
  const task = tasks.find((task: Task) => task.id === id) ?? defaultTask;

  const [secondsLeft, setSecondsLeft] = useState(task.duration * 60);
  const [isActive, setIsActive] = useState(false);

  /**
   * Formats time in seconds to a string in the format of mm:ss
   * @param {Number} seconds
   * @returns {String} formatted time in the format of mm:ss
   */
  const formatTimeLeft = (seconds: number): string => {
    const formatMinutes = Math.floor(seconds / 60);
    const formatSeconds = seconds % 60;
    return `${formatMinutes}m : ${formatSeconds > 9 ? formatSeconds : '0' + formatSeconds}s`;
  };

  const calcPercentage = () => (secondsLeft / (task.duration * 60)) * 100;

  const setDocumentTitle = (content?: string) => {
    document.title = content ? `${content} • Reactodoro` : 'Reactodoro';
  };

  const resetClickHandler = () => {
    setSecondsLeft(task.duration * 60);
    setIsActive(false);
    setDocumentTitle();
  };

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);

      setDocumentTitle(`${formatTimeLeft(secondsLeft)} 🧑‍💻`);

      if (secondsLeft === 0) {
        clearInterval(interval);
        dispatchTasks({ type: TaskActions.COMPLETE_TASK, payload: task });
        setDocumentTitle('Task Complete 🎉');
      }
      return () => clearInterval(interval);
    }
  }, [isActive, secondsLeft]);

  return (
    <div>
      <main className="content">
        <Navbar />

        <section className="card bg-secondary my-8 pa-6 rounded-lg grid grid-cols-2 fluid-grid gap-2">
          {/* Timer */}
          <div className="pa-4 bg-white rounded-lg">
            <CircularProgressbar
              className="timer-display"
              value={calcPercentage()}
              text={formatTimeLeft(secondsLeft)}
              styles={buildStyles({
                textSize: '1rem',
                pathColor: '#212121',
                trailColor: '#e0e0e0',
                textColor: '#212121',
              })}
            />
            <div className="grid grid-cols-2 fluid-grid my-8">
              <button
                className="btn btn-gray rounded"
                onClick={() => setIsActive(true)}
                disabled={secondsLeft === 0}>
                <i className="fas fa-play mr-2"></i>
                Start
              </button>
              <button className="btn btn-gray outlined rounded" onClick={() => setIsActive(false)}>
                <i className="fas fa-pause mr-2"></i>
                Pause
              </button>
            </div>
            <button
              className="btn btn-secondary full-width rounded"
              onClick={() => resetClickHandler()}>
              <i className="fas fa-undo mr-2"></i>
              Reset
            </button>
          </div>

          {/* Task Details */}
          <div className="pa-8 bg-white rounded-lg">
            <h3 className="heading-3">{task.title}</h3>
            <p className="text-md my-4">{task.description}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
