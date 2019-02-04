
import './App.css';
import React, { useState, useEffect } from 'react'
import personService from './services/persons'




const PassMessage = ({message}) =>{
  if(message === null){
    return null
  }
  return(
    <div className="pass">
    {message}
    </div>
  )

}

const ErrorMessage = ({message}) =>{
  if(message === null){
    return null
  }
  return(
    <div className="error">
    {message}
    </div>
  )
  
}


const Person = (props)=>{
  return(
   <div>
     {props.person.name} {props.person.number}
     <PoistoNappi poista = {props.poista}/>
   </div>
  )

}

const AllPerson = (props)=>{

  const personsToshow = props.allPersons.filter(person=>
    person.name.toLowerCase().includes(props.newFilter.toLowerCase()))

  return(
    personsToshow.map(person =>
    <Person poista={()=> {props.poista(person.id)}} key={person.id} person = {person}/>)
    
  )
}

const PoistoNappi = (props) =>{
  return(
  <button onClick={props.poista}> Poista </button>
  )

}

const FilterLomake = (props) =>{

  return(
  <input 
    value={props.value}
    onChange={props.handler}
  />
  )
  }

const NimiNumeroLomake = (props) =>{

  return(
    <form
    onSubmit = {props.submit}>
    <div>
      {props.nimiEka}<input
      value={props.value1}
      onChange = {props.onChangeName}
      />
    </div>
    <div> {props.nimiToka}<input 
    value= {props.value2}
    onChange= {props.onChangeNumber}
    />
    </div>
    <button type = {props.buttonType}>{props.buttonName}</button>
    </form>
  )

}


const App = () => {

  const [ persons, setPersons] = useState([
    
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] =useState("")
  const [ newFilter, setNewFilter] =useState("")
  const [ passMessage, setPassMessage] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)


  useEffect(()=> {
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  },[])
  
  const handleNameChange = (event) =>{
    setNewName(event.target.value)

  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    
    setNewFilter(event.target.value)
  }


  const addNimiNumero = (event) =>{
    event.preventDefault()

    const nameNumberObject  ={
    name: newName,
    number: newNumber,
    
    }
    for(var i=0; i<persons.length;i++){
      if(persons[i].name===newName){
        if(
        window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella ?`)){

          const id = persons[i].id
          const number = nameNumberObject.number
          personUpdate(id,number)
        
        }
        setNewName("")
        setNewNumber("")
        return
      }
    }

    personService
    .add(nameNumberObject)
    .then(response=>{
      setPersons(persons.concat(response.data))
      setNewName("")
      setNewNumber("")
      setPassMessage(
        "Henkilö " + nameNumberObject.name + " lisättiin"
      )
      setTimeout(()=>{
        setPassMessage(null)
      },5000)
    


    })

    
  }

  const personUpdate = (id, number) =>{
    const person = persons.find(p => p.id === id)
    const updatedPerson = {...person, number: number}

    personService
    .update(id, updatedPerson)
    .then(response =>{
      setPersons(persons.map(person => person.id !== id ? person: response.data))
      setPassMessage(
        "Henkilön " + getPersonName(id) + " tietoja muutettin"
      )
      setTimeout(()=>{
        setPassMessage(null)
      },5000)
    })
    .catch(error =>{
      setErrorMessage(
        "Henkilö " + getPersonName(id) + " on jo poistettu"
      )
      setPersons(persons.filter(person=> person.id !== id))
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)

    })

  }

  
  const personDelete = (id) =>{

    if(window.confirm("Poistetaanko " + getPersonName(id) + " ?")){
    personService
    .deletePerson(id)
    .then(response =>{
      setPersons(persons.filter(person=> person.id !== id))
      setPassMessage(
        "Henkilö " + getPersonName(id) + " poistettiin"
      )
      setTimeout(()=>{
        setPassMessage(null)
      },5000)
    }).catch(error =>{
      setErrorMessage(
        "Henkilö " + getPersonName(id) + " on jo poistettu"
      )
      setPersons(persons.filter(person=> person.id !== id))
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)
    })
    
    }
  }

  const getPersonName = (id) =>{
    let person
    for(let i=0; i<persons.length;i++){
        if(persons[i].id === id){
           person=persons[i].name
        }
    }
    return(
      person
    )
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <PassMessage message = {passMessage} />
      <ErrorMessage message = {errorMessage} />
     Hae nimistä: 
     <FilterLomake value= {newFilter} handler={handleFilterChange}/>
      <h2>Lisää uusi</h2>
     <NimiNumeroLomake submit = {addNimiNumero} nimiEka= "Nimi: "
     value1={newName} onChangeName={handleNameChange} nimiToka ="Numero: "
     value2= {newNumber} onChangeNumber={handleNumberChange} buttonType="submit"
     buttonName = "lisää" /> 
      <h2>Numerot</h2>
      <AllPerson poista={personDelete} allPersons={persons} newFilter={newFilter}/>
    </div>

  )

}
export default App;
