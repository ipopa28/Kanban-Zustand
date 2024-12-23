import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const store = (set) => ({
	tasks: [],
	draggedTask: null,
	//we want to use all the current tasks and add a new one (we're taking the store and adding one new element to the array)
	//we can do a fetch request and store the result inside the store using async keyword
	addTask: (title, state) => 
		set((store) => ({tasks: [...store.tasks, { title, state }] }), false, "addTask"),
	//delete the tasks that don't have the title we're passing
	deleteTask: (title) => set((store) => ({tasks: store.tasks.filter(task => task.title !== title), })),
	setDraggedTask: (title) => set({draggedTask: title}),
	moveTask: (title, state) => set((store) => ({tasks: store.tasks.map((task) => (task.title === title ? {title, state} : task)),
	})),

});

//way to manipulate the existing getters and setters
const log = (config) => (set, get, api) => config(
	(...args) => {
		console.log(args);
		set(...args);
	},
	get,
	api
);

/*persist function doesn't work without options, the most important of which is the name (=key under
which everything is stored in the local storage) */
export const useStore = create(log(persist(devtools(store), { name: "store" })));	
