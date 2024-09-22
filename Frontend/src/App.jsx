import { useState } from 'react'
import { SimpleRegistrationForm } from './components/signup'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <SimpleRegistrationForm/>
   
    </>
  )
}

export default App
