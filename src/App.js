import React, { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo"
import Form from "./components/Form"
import FilterButton from "./components/FilterButton"

import './App.css';

	const FILTER_MAP = {
	  All: () => true,
	  Active: task => !task.completed,
	  Completed: task => task.completed
	};
	const FILTER_NAMES = Object.keys(FILTER_MAP);
	

function App(props) {
//	const taskList = props.tasks?.map(task => task.name);
	const [tasks, setTasks]=useState(props.tasks)
	const [filter, setFilter] = useState('All');
	
	
	function addTask(name){
		let newTask ={id:"todo-"+nanoid(),name:name,completed:false}
		setTasks([...tasks,newTask])
		//alert(name)		
	}


	function toggleTaskCompleted(id) {
//	alert(id)
//	alert(tasks[id].completed)
		const updatedTasks = tasks.map(task => {
		alert(id+ " -- "+task.id+" - "+task.name)
		    // if this task has the same ID as the edited task
		    if (id === task.id) {
		  //  alert("essa é igual")
		      // use object spread to make a new object
		      // whose `completed` prop has been inverted
		      return {...task, completed: !task.completed}
		    }
		    return task;
		  });
		  setTasks(updatedTasks);
		}


	function deleteTask (id){
		alert("deletando"+id)
		const remainingTasks = tasks.filter(task => id !== task.id);
		setTasks(remainingTasks);
	}

	function editTask(id, newName) {
	  const editedTaskList = tasks.map(task => {
	  // if this task has the same ID as the edited task
	    if (id === task.id) {
	      //
	      return {...task, name: newName}
	    }
	    return task;
	  });
	  setTasks(editedTaskList);
	}
	const filterList = FILTER_NAMES.map(name => (
  		<FilterButton
  		 key={name}
  		 name={name}
	   	isPressed={name === filter}
    	 setFilter={setFilter}

  		  />
	));
	


	const taskList = tasks
		.filter(FILTER_MAP[filter])
		.map(task => (
  			<Todo
    			id={task.id}
    			name={task.name}
    			completed={task.completed}
    			key={task.id}
    			toggleTaskCompleted={toggleTaskCompleted}
    			deleteTask={deleteTask}
    			editTask={editTask}
  			/>
		));




	const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
	const headingText = `${taskList.length} ${tasksNoun} remaining`;


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
		{taskList}
        
        
      </ul>
    </div>
  );
}



export default App;
