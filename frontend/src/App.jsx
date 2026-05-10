import { useState } from 'react'
import './App.css'
import Notes from './Components/Notes/Notes'
import LogoLoading from './Components/LogoLoading'
function App() {


  return (
    <>
    <LogoLoading>
    <Notes />
    </LogoLoading>
    </>
  )
}

export default App
