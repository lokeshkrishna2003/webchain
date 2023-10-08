import { useState } from 'react'
import {Welcome,Transactions,Services,Navbar,Footer,Loader} from './components/Index'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<div className='min-h-screen'>
  <div className='gradient-bg-welcome'>
    <Navbar/>
    <Welcome/>
  </div>
  <Services/>
  <Transactions/>
  <Footer/>
</div>
    </>
  )
}

export default App
