import { StateCreator, create } from "zustand";
import { TaskModel, TaskStatus } from "../models"

interface TaskState {
    tasks: Record<string, TaskModel>;
    filterByStatus: (status: TaskStatus) => TaskModel[]
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
    tasks: {
        'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
        'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
        'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' },
        'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' }
    },
    filterByStatus: (status: TaskStatus) => {
       return Object.values(get().tasks).filter(task => task.status === status);
    }
});

export const useTaskStore = create<TaskState>()(storeApi);