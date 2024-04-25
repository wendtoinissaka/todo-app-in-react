import React, { Fragment, useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
function App() {

  const [listeTaches, setListeTaches] = useState([])
  const [controleSaisi, setControleSaisi] = useState(false)
  const [tacheModifier, setTacheModifier] = useState(null)
  const [tache, setTache] = useState("")
  const [modifierTache, setModifierTache] = useState("")
  const [modifierDescription, setModifierDescription] = useState("")
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
  const onModifierTacheChange = (e)=>{
    setModifierTache(e.target.value)
  }
  const onModifierDescriptionChange = (e)=>{
    setModifierDescription(e.target.value)
    console.log(modifierDescription);
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
    }else{
      setControleSaisi(true)
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
    let tache = listeTaches.filter(tache => tache.id === tacheId)
    setTacheModifier(tache[0])
    setModifierDescription(tache[0].description)
    setModifierTache(tache[0].tache)
    

    setOpenEditForm(!openAddForm)
    // console.log(openEditForm)
    setListeTaches(listeTaches)
  }


const updatesubmitButton = (e) => {
  e.preventDefault();

  // Vérifiez que les champs sont remplis
  if (modifierDescription.trim() !== "" && modifierTache.trim() !== "") {
    // Créez un nouveau tableau de tâches mis à jour
    const updatedListeTaches = listeTaches.map(tache => {
      // Si l'ID de la tâche correspond à l'ID de la tâche modifiée, mettez à jour ses valeurs
      if (tache.id === tacheModifier.id) {
        return {
          ...tache,
          description: modifierDescription,
          tache: modifierTache
        };
      }
      // Sinon, retournez la tâche inchangée
      return tache;
    });

    // Mettez à jour l'état avec le nouveau tableau de tâches mis à jour
    setListeTaches(updatedListeTaches);
    setListeTaches(updatedListeTaches)
    // Réinitialisez les champs et l'état de tacheModifier
    setModifierDescription("");
    setModifierTache("");
    setTacheModifier(null);

    setOpenEditForm(false);
  } else {
  }
};
  const addTacheButton =()=>{
    setOpenAddForm(!openAddForm)
    setControleSaisi(false)
  }

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
    <div className='container flex-grow-1'>
      <h1 className='text-center my-5'>Application de gestion de tâche en React <br/> <br/> 🔥🔥🔥25 Avril 2024🔥🔥🔥</h1>
      <Button variant="primary my-3" type="submit" onClick={addTacheButton}>
        Ajouter une tâche
      </Button>
      <div>
      {/* <h1>Ma Todo List</h1> */}

    </div>




{ openAddForm &&
      <Form onSubmit={submitButton}>
      <Form.Group className="mb-3">
        {/* <Form.Label>Tâche</Form.Label> */}
        <Form.Control type="text" placeholder="Enter la tâche" value={tache} onChange={onTacheChange} />
       {controleSaisi && <p className="text-danger p-2">veuillez saisir la tâche</p>}
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
      {listeTaches.length ?
      <tbody>
      {listeTaches.map(tache =>(
        <Fragment key={tache.id}>
          
        <tr>
          <td >{tache.numero} </td>
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

        </Fragment>

      ))  }
      </tbody> :<p className='py-5 text-danger' >Aucune tâche pour le moment</p>}
    </Table>



    {
      // Formulaire de modification
openEditForm &&
<div className="edit-form" >

<h2>Modifier la tâche</h2>

  <form onSubmit={updatesubmitButton}>
    <div className="form-group">
      <label for="editTaskName">Tâche</label>
      <input type="text" className="form-control " id="editTaskName"  name="task" value={modifierTache} onChange={onModifierTacheChange} required  />
      <label for="editTaskDescription" className='mt-3'>Description</label>
      <textarea className="form-control" id="editTaskDescription" rows="3"  name="description" value={modifierDescription} onChange={onModifierDescriptionChange}></textarea>
    </div>
    <button type="submit" className="btn btn-primary m-3" >Enregistrer</button>
    <button type="button" className="btn btn-secondary m-3" onClick={()=>setOpenEditForm(false)} >Quitter</button>
  </form>
</div>

}


    </div>
    {/* Footer */}
    <footer className="footer  py-3 bg-light">
        <div className="container text-center">
          <span className="text-muted fw-bolder fs-3">©🔥🔥🔥Lacapacitee🔥🔥🔥</span>
        </div>
      </footer>
    </div>
  )
}

export default App