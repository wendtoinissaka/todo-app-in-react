import React, { useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
function App() {

  const [listeTaches, setListeTaches] = useState([])
  const [tache, setTache] = useState("")
  const [description, setDescription] = useState("")
  const [numero, setNumero] = useState(1)
  const [status, setStatus] = useState(true)
  const [openAddForm, setOpenAddForm] = useState(false)
  const [openEditForm, setOpenEditForm] = useState(false)

  const onTacheChange = (e)=>{
    setTache(e.target.value)
  }
  const onDescriptionChange = (e)=>{
    setDescription(e.target.value)
  }
  
  const submitButton = (e) =>{
    e.preventDefault()
    if(tache.trim() !==""){
      setNumero(numero+1)
      const newTache = {
        id : Math.floor(Math.random() * 1000),
        numero : numero,
        description : description,
        tache : tache,
        status : status
      };
      // console.log(newTache);
      setListeTaches([...listeTaches, newTache])
      setTache("")
      setDescription("")
      setOpenAddForm(false)
    }
  }
  const check = () =>{
    setStatus(!status)
  }
  const deleteTache = (tacheId) =>{
    let list = listeTaches.filter(tache => tache.id !==tacheId)
    setListeTaches(list)
  }

  const updateTache = (tacheId) =>{
    console.log("updata")
    setOpenEditForm(!openAddForm)
    console.log(openEditForm)
  }
  
  return (
    <div className='container'>
      <h1 className='text-center my-5'>To do App in React</h1>
      <Button variant="primary my-3" type="submit" onClick={() =>setOpenAddForm(!openAddForm)}>
        Ajouter une tâche
      </Button>
      <div>
      <h1>Ma Todo List</h1>

    </div>

    {
openEditForm &&
<div className="" >
<Modal.Dialog className='d-flex justify-content-center align-items-center border border-rounded ' style={{width:"50%"}}>
<Modal.Header  >
  <Modal.Title className='text-center'>Mofication de la tâche</Modal.Title>
</Modal.Header>

<Modal.Body>
<Form.Group className="mb-3">
        <Form.Label>Tâche</Form.Label>
        <Form.Control type="text" placeholder="Enter la tâche" value={tache} onChange={onTacheChange} />
      </Form.Group>
      <FloatingLabel controlId="floatingTextarea2" label="Description">
        <Form.Control
          as="textarea" 
          placeholder="Decriver votre tâche"
          style={{ height: '100px'}}
          onChange={onDescriptionChange}
          value={description}
        />
      </FloatingLabel>
      
</Modal.Body>

<Modal.Footer>
  <Button variant="primary" className='mx-3'>Enregistrer</Button>
  <Button variant="secondary" onClick={()=>setOpenEditForm(false)}>Quitter</Button>
</Modal.Footer>
</Modal.Dialog>
</div>
}


{ openAddForm &&
      <Form onSubmit={submitButton}>
      <Form.Group className="mb-3">
        <Form.Label>Tâche</Form.Label>
        <Form.Control type="text" placeholder="Enter la tâche" value={tache} onChange={onTacheChange} />
      </Form.Group>
      <FloatingLabel controlId="floatingTextarea2" label="Description">
        <Form.Control
          as="textarea" 
          placeholder="Decriver votre tâche"
          style={{ height: '100px'}}
          onChange={onDescriptionChange}
          value={description}
        />
      </FloatingLabel>

      <Button variant="primary my-3" type="submit">
        Enregistrer
      </Button>
    </Form>
}



    <h1>Liste des taches</h1>


    <Table striped bordered hover className='text-center'>
      <thead>
        <tr>
          <th>Numero</th>
          <th>Tache</th>
          <th>Description</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {listeTaches.map(tache =>(
        <>

        <tr>
          <td>{tache.numero} </td>
          <td>{tache.tache} </td>
          <td>{tache.description } </td>
          <td>
          <Form.Check
           onClick={check}          
            // type={type}
            // label={`disabled ${type}`}
            // id={`disabled-default-${type}`}
          /> </td>
          {

          }
          <td>
            
          <Button variant="primary" onClick={() =>updateTache(tache.id)}>Modifier</Button>{' '}
          <Button variant="secondary" onClick={() =>deleteTache(tache.id)}>Supprimer</Button>{' '}
          </td>
        </tr>
        <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >

    </div>
        </>

      ))}
      </tbody>
    </Table>




    </div>
  )
}

export default App