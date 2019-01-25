import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) =>{
     let hyva = props.hyva;
     let neutraali = props.neutraali
     let huono = props.huono
     let yhteensa = hyva + neutraali + huono
     let keskiarvo = (1*hyva + 0*neutraali+ -1*huono)/yhteensa
     let positiivisia = (100*hyva)/yhteensa

     if(yhteensa ==0){
         return(
             <div>
                 <h1>Statistiikka</h1>
                 <p>
                     Ei yhtään palautetta annettu
                 </p>
             </div>
         )
     }
      return(
        <div>
            <h1>Statistiikka</h1>
          <Statistic name = "Positiivisia" arvo= {hyva} />
          <Statistic name = "Neutraaleja" arvo = {neutraali}/>
          <Statistic name = "Negatiivisia" arvo= {huono} />
          <Statistic name = "Yhteensä" arvo= {yhteensa} />
          <Statistic name = "Keskiarvo" arvo= {keskiarvo} />
          <Statistic name = "Positiivisia" arvo={positiivisia}
          merkki = "%" />
        </div>
        

      )
}

const Statistic = (props) =>{
      return(
          <tr>
              <td>{props.name} &emsp;  </td>  
              <td>{props.arvo} {props.merkki}</td>
          </tr>
      )
}

const Header = (props)=>{
    return (
        <div>
            <h1> 
                {props.otsikko}
            </h1>
        </div>
    )
}

const Button = (props) =>
    <button onClick={props.handleClick}>
       {props.name}
    </button>



const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = ()=>{
    setGood(good+1)

  }

  const handleNeutralClick = ()=>{
      setNeutral(neutral+1)
  }

  const handleBadClick = ()=>{
    setBad(bad+1)
  }


  return (
    <div>
      <Header otsikko="Anna palautetta" />
      
      <Button handleClick={()=> handleGoodClick()} 
        name ="hyva" />

      <Button handleClick={()=> handleNeutralClick()}
        name = "neutraali" />
      
      <Button handleClick={()=> handleBadClick()}
        name = "negatiivinen" />

      <Statistics hyva={good} neutraali={neutral} 
        huono={bad}/>

    </div>

  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)