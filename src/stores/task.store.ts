import { StateCreator, create } from "zustand";
import { TaskModel, TaskStatus } from "../models"
import { devtools, persist } from "zustand/middleware";
import { v4 as uuid } from 'uuid';
//import { produce } from 'immer';
import { immer } from "zustand/middleware/immer";

interface TaskState {
    draggingTaskId?: string;
    tasks: Record<string, TaskModel>;
    filterByStatus: (status: TaskStatus) => TaskModel[];
    setDraggingTaskId: (taskId: string) => void;
    removeDraggingTaskId: () => void;
    changeTaskStatus: (status: TaskStatus) => void;
    onTaskDrop: (status: TaskStatus) => void;
    addTask: (title: string, status: TaskStatus) => void;
}

type DevtoolType = ["zustand/devtools", never];
type ImmerType = ["zustand/immer", never];
type DevImmerType = [DevtoolType, ImmerType];

const storeApi: StateCreator<TaskState, DevImmerType> = (set, get) => ({
    tasks: {
        'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
        'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
        'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' },
        'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' }
    },
    filterByStatus: (status: TaskStatus) => {
        return Object.values(get().tasks).filter(task => task.status === status);
    },
    setDraggingTaskId: (taskId: string) => {
        set({ draggingTaskId: taskId })
    },
    removeDraggingTaskId: () => set({ draggingTaskId: undefined }),
    changeTaskStatus: (status: TaskStatus) => {
        const taskId = get().draggingTaskId as string;
        //const task = get().tasks[taskId];
        /* const updatedTask: TaskModel = {
            ...task,
            status
        } */

        set(state => {
            state.tasks[taskId] = {
                ...state.tasks[taskId],
                status
            };
        });

        /* set(
                    produce((state: TaskState) => {
                        state.tasks[taskId] = updatedTask;
                    })
                ) */
    },
    onTaskDrop: (status: TaskStatus) => {
        const taskId = get().draggingTaskId;
        if (taskId) {
            get().changeTaskStatus(status);
            get().removeDraggingTaskId();
        }
    },
    addTask: (title: string, status: TaskStatus) => {
        const id = uuid();
        const task: TaskModel = {
            id,
            title: `${title} ${Date.now()}`,
            status
        }

        set(state => {
            state.tasks[task.id] = task
        })

        /* set(
            produce((state: TaskState) => {
                state.tasks[id] = task;
            })
        ); */
    },
});

export const useTaskStore = create<TaskState>()(
    devtools(
        persist(
            immer(storeApi),
            { name: 'task-store' }
        )
    )
);