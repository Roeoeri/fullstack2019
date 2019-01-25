import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>{
    return(
     <h1>{props.kurssi}</h1>
    )
}

const Part = (props) =>{
    return(
        <div>
            <p>
        {props.kurssi.name}  {props.kurssi.excercises}
            </p>
        </div>
    )
}

const Total = (props)=>{
    return(
        <div>
            <p>
                yhteensä {props.taulukko[0].excercises + 
                          props.taulukko[1].excercises +
                          props.taulukko[2].excercises} tehtävää
            </p>
        </div>
    )
}

const Content= (props) =>{
    return(
        <div>
            
            <Part kurssi ={props.taulukko[0]}/>
            <Part kurssi ={props.taulukko[1]}/>
            <Part kurssi ={props.taulukko[2]}/>
        </div>
    )
}

const App = () => {
  
  const course = {
  name: 'Half Stack -sovelluskehitys',
  parts: [
  {
      name: 'Reactin alkeet',
      excercises: 10
  },
  {
      name: 'Tiedonvälitys propseilla',
      excercises: 7
  },
  {
      name: 'Komponenttien tila',
      excercises: 14

  
  }
]
}
  return (
    <div>
      <Header kurssi={course.name}/>


      <Content  taulukko={course.parts} />


      <Total taulukko ={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))