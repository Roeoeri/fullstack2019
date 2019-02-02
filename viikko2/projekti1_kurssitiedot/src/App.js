import React from 'react';
import Course from './components/Course'



const App = ({course}) => {
  return (
    
      course.map(kurssi=> <Course key={kurssi.id} kurssi ={kurssi} />)
    
  )
}

export default App

