export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

class TaskStore {
  private static instance: TaskStore;
  private tasks: Task[] = [];

  private constructor() {}

  public static getInstance(): TaskStore {
    if (!TaskStore.instance) {
      TaskStore.instance = new TaskStore();
    }
    return TaskStore.instance;
  }

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  public addTask(task: Task): void {
    this.tasks.push(task);
  }

  public updateTask(id: string, updates: Partial<Omit<Task, "id" | "createdAt">>): Task | undefined {
    const task = this.getTaskById(id);
    if (task) {
      Object.assign(task, updates);
      task.updatedAt = new Date().toISOString();
      return task;
    }
    return undefined;
  }

  public deleteTask(id: string): boolean {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default TaskStore;
