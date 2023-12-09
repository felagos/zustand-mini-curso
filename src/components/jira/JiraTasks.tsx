import { DragEvent, useState } from 'react';
import { IoAddOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { TaskModel, TaskStatus } from '../../models';
import { SingleTask } from './SingleTask';
import { useTaskStore } from '../../stores';
import classnames from 'classnames';

interface Props {
  title: string;
  status: TaskStatus;
  tasks: TaskModel[];
}


export const JiraTasks = ({ title, tasks, status }: Props) => {

  const isDragging = useTaskStore(state => state.draggingTaskId !== undefined);
  const changeTaskStatus = useTaskStore(state => state.changeTaskStatus);
  const onTaskDrop = useTaskStore(state => state.onTaskDrop);
	const addTask = useTaskStore(state => state.addTask);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const onDragOver = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    setIsDragOver(false);
  };

  const onDragDrop = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    setIsDragOver(false);
    changeTaskStatus(status);
    onTaskDrop(status);
  };

	const handleTask = () => {
		addTask("Task", status);
	}

  return (
    <div 
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDragDrop}
    className={classnames("!text-black relative border-4 flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]", 
    {
      "border-blue-500 border-dotted": isDragging,
      "border-green-500 border-dotted": isDragOver,
    })}>


      {/* Task Header */}
      <div className="relative flex flex-row justify-between">

        <div className="flex items-center justify-center">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: '50px' }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button onClick={handleTask}>
          <IoAddOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className="h-full w-full">
        {
          tasks.map(task => <SingleTask key={task.id} task={task} />)
        }
      </div>
    </div>
  );
};