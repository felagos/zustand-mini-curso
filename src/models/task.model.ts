export type TaskStatus = 'open' | 'in-progress' | 'done'

export interface TaskModel {
    id: string;
    title: string;
    status: TaskStatus;
}