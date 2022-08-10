type Task = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  duration: number;
};

type TaskList = Task[];

export type { Task, TaskList };
