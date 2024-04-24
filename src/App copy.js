import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './App.css';
import { useRef, useState } from 'react';

function App() {
  const titleRef = useRef();
  const descriptionRef = useRef();

  const [listTache, setListTache] = useState([]);

    const [nouvelleTache, setNouvelleTache] = useState([
    { 
      numero: 0, 
      tache: '',
      description : '',
      status : false
    },

  ]);  

  const ajouterTache =(e) =>{
    e.preventDefault()
    const nouvelleTache = {
      // numero: 1, 
      tache: titleRef.current.value,
      description : descriptionRef.current.value,
      status : false
      
    }
    console.log("Titre:", this.numero +=1);
    console.log("Description:", titleRef.current.value);
    console.log("Statut:", descriptionRef.current.value);
    titleRef.current.value = '';
    descriptionRef.current.value = '';
  }



  const [todo, setTodo] = useState("")
  const [todoList, setTodoList] = useState([])

  const addToDo = (e) =>{
    e.preventDefault()
    const newToDO = {
      id: Math.floor(Math.random() * 1000),
      value : todo
    }

    setTodoList(precedent =>[...precedent, newToDO])
    setTodo("")
  }
  const deleteTodo = (todoid) =>{
    const newToDO = todoList.filter(todo =>todo.id !==todoid)
    setTodoList(newToDO)
  }

  const editEdit = (id) =>{

  }

  // const deleteToDo = (todoId) => {
  //   // const index = todoList[todoId].index
  //   console.log(todoId, "sa se voti");
  //   const newTodos = todoList.filter(todo => todo.id !==todoId)
  //   // const newTodos = todoList.splice(todoId, 1)
  //   // setTodoList(newTodos)
  //   setTodoList(todoList.filter(todo => todo.id !== todoId));
  // }
  
  return (


    
    <div className="w-75 mx-auto py-5">

      
      <h1>Todo List</h1>
{ 
      <form onSubmit={addToDo}>
  <div className="mb-3">
    <label  className="form-label">Tâche</label>
    <input 
      type="text" 
      className="form-control" 
      value={todo} 
      onChange={(e) =>{setTodo(e.target.value)}} 
      />
  </div>

  <button type="submit"  className="btn btn-primary w-100">Enregistrer</button>
</form> }

<h1 className='my-5'>Listes des tâches</h1>
<ol>
  {/* {todoList.length ? todoList.map(tache =>( 
    <div key={todo.id}>
    <li  > {tache.value} </li>
    <button onClick={() => deleteToDo(todo.id)}>x</button>
    </div>
  )) : <span className='text-danger text-center'>Pas de encore de tâche</span>} */}
  {
    todoList.length ?
    todoList.map(todo => {
    return <div key={todo.id} className='d-flex gap-2 mt-3'>
    <li >{todo.value}</li>
    <button onClick={() => deleteTodo(todo.id)} >

    <FontAwesomeIcon icon={faTrash} color='red' />
    </button>
    <button>
              <FontAwesomeIcon icon={faEdit} color='blue' />
            </button>
    </div>
    }): <span className='text-danger'>Pas encore de todo</span>
  }
</ol>




    </div>
  );



}

export default App;
