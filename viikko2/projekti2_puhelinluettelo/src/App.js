
import './App.css';
import React, { useState } from 'react'


const Person = (props)=>{
  return(
   <div>
     {props.person.name} {props.person.number}
   </div>
  )

}

const AllPerson = (props)=>{

  const personsToshow = props.allPersons.filter(person=>
    person.name.toLowerCase().includes(props.newFilter.toLowerCase()))

  return(
    personsToshow.map(person =>
    <Person key={person.name} person = {person}/>)
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
    <button type = {props.buttonType}>{}props.buttonName</button>
    </form>
  )

}


const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] =useState("")
  const [ newFilter, setNewFilter] =useState("")
  
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
    number: newNumber
    }
    for(var i=0; i<persons.length;i++){
      if(persons[i].name===newName){
        setNewName("")
        setNewNumber("")
        window.alert(`${newName} on jo luettelossa`)
        return
      }
    }
    
    setPersons(persons.concat(nameNumberObject))
    setNewName("")
    setNewNumber("")
  }


  return (
    <div>
      <h2>Puhelinluettelo</h2>
     Hae nimistä: 
     <FilterLomake value= {newFilter} handler={handleFilterChange}/>
      <h2>Lisää uusi</h2>
     <NimiNumeroLomake submit = {addNimiNumero} nimiEka= "Nimi: "
     value1={newName} onChangeName={handleNameChange} nimiToka ="Numero: "
     value2= {newNumber} onChangeNumber={handleNumberChange} buttonType="submit"
     buttonName = "lisää" /> 
      <h2>Numerot</h2>
      <AllPerson allPersons={persons} newFilter={newFilter}/>
    </div>

  )

}
export default App;
