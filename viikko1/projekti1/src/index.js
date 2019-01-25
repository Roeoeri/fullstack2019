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
        {props.sisalto}  {props.maara}
            </p>
        </div>
    )
}

const Total = (props)=>{
    return(
        <div>
            <p>
                yhteensä {props.yhteensa} tehtävää
            </p>
        </div>
    )
}

const Content= (props) =>{
    return(
        <div>
            <Part sisalto ={props.sisalto1} maara={props.maara1}/>
            <Part sisalto ={props.sisalto2} maara={props.maara2}/>
            <Part sisalto ={props.sisalto3} maara={props.maara3}/>
        </div>
    )
}








const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

  return (
    <div>
      <Header kurssi={course}/>

      
      <Content sisalto1={part1} maara1={exercises1}
               sisalto2={part2} maara2={exercises2}
               sisalto3={part3} maara3={exercises3}/>


      <Total yhteensa={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))