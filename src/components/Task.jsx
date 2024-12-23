import './Task.css';
import classNames from 'classnames';
import { useStore } from '../store';
import { useMemo } from 'react';
import trash from '../assets/trash.svg';	


export default function Task({ title }) {
    const tasks = useStore((store) => store.tasks);
    const task = useMemo(() => tasks.find((task) => task.title === title), [title, tasks]);
    const setDraggedTask = useStore((store) => store.setDraggedTask);
    const deleteTask = useStore((store) => store.deleteTask);
    
    return (
        <div className='task' draggable onDragStart={() => setDraggedTask(task.title)}>
            <div>{task.title}</div>
            <div className='bottomWrapper'>
                <div><img src={trash} alt='trashIcon' onClick={() => deleteTask(task.title)} /></div>
                <div className={classNames('status', task.state)}>{task.state}</div>
            </div>
        </div>
    );
}