import { useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Main from './Components/Main/Main'

import Qna from './Components/FAQ/Qna'

function App() {
  

  return (
    <div>

    <Navbar/>
    

    <Main/>
    {/* <Faq/> */}
    <Qna/>
    
    </div>
    
  )
}

export default App
