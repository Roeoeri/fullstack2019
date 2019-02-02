import React from 'react'

const Course =(props)=>{


    const Header = (props) =>{
        return(
         <h1>{props.kurssiNimi}</h1>
        )
    }

    const Part = (props) =>{
    return(
        <div>
            <p>
        {props.kurssi.name}:  {props.kurssi.exercises} tehtävää
            </p>
        </div>
    )
}

const Total = (props)=>{

    const initialValue =0
    const total = props.taulukko.reduce(
     (s,p) => s + p.exercises,
     initialValue
 
    );
 
     return(
         <div>
             <li>
                 Yhteensä: {total} tehtävää
            </li>
         </div>
     )
 }


    return(
    <div>
    <Header kurssiNimi= {props.kurssi.name} />
    <ul>
         {props.kurssi.parts.map(osa => <li key = {osa.id}><Part kurssi ={osa}/></li>)}
         <Total taulukko = {props.kurssi.parts} />
    </ul>
    </div>

    )
}

export default Course
