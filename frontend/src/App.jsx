import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Todolist from './Todolist'
import AddTask from './AddTask'
import UpdateTask from "./UpdateTask"
import Login from "./Login"
import Signup from "./Signup"


function App() {

  return (
    <>
      <div className="app">
      <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} ></Route>
        <Route path='/signup' exact element= {<Signup />}></Route>
        <Route path='/Todolist' exact element= {<Todolist />}></Route>
        <Route path="/create" exact element={<AddTask />} ></Route>
        <Route path="/update/:id" exact element={<UpdateTask />} ></Route>
      </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
