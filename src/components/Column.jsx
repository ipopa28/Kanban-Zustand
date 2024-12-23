import './Column.css'
import Task from './Task'
import { useStore } from '../store'; 
import { useMemo, useState } from 'react';
import classNames from 'classnames';

export default function Column({ state }) {

	const [text, setText] = useState("");
	const [open, setOpen] = useState(false);
	const [drop, setDrop] = useState(false);

	const tasks = useStore((store) => store.tasks);
	
	//only when the tasks change, this component will re-render
	const filteredTasks = useMemo(() => tasks.filter((task) => task.state === state), [tasks, state]);

	const addTask = useStore((store) => store.addTask);
	const setDraggedTask = useStore((store) => store.setDraggedTask);
	//to know what we actually dropped onto our column
	const draggedTask = useStore((store) => store.draggedTask);
	const moveTask = useStore((store) => store.moveTask);

		//when using filter, a new array is created, which causes re-renders, so we need to use a shallow comparison
		/* (store) => store.tasks.filter((task) => task.state === state),
		shallow
	); */

		//we evaluate which of the 2 is longer, we save the length as a number
		/* (prev, next) => {
		 	const longest = prev.length > next.length ? prev.length : next.length;
		 	for(let i=0; i<longest; i++) {
		 		if(!prev[i] || !next[i]) {
		 			return false; //they can't be equal if one of the arrays is longer than the other one
		 		}
		 		if(prev[i] !== next[i]) {
		 			return false; 
		 		}
		 	}
		 	return true;
		 } */

	return ( 
	<div 
		className={classNames("column", {drop: drop})} 
		onDragOver={(e) => {
			setDrop(true);
			e.preventDefault();
		}}
		onDragLeave={(e) => {
			setDrop(false);
			e.preventDefault();
		}}
		onDrop = {(e) => {
			setDrop(false);
			moveTask(draggedTask, state)
			//when we drop something, we aren't dragging anything anymore
			setDraggedTask(null);
			console.log(draggedTask)
		}}
	>
		<div className='titleWrapper'>
			<p>{state}</p>
			<button onClick={()=> setOpen(true)}>Add</button>
		</div>
		{filteredTasks.map((task) => (
			<Task key={task.title} title={task.title} />
		))}
		{ open && (
		<div className="modal">
			<div className='modalContent'>
				<input onChange={(e) => setText(e.target.value)} value={text}/>
				<button 
				onClick={()=>{
					addTask(text, state); 
					setText(''); 
					setOpen(false);
					}}
				>
					Submit
				</button>
			</div>
		</div>
		)}
		</div>
	);
}
