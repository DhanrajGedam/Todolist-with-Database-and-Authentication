import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
    const [name, setName] = useState('')
    const navigate = useNavigate();
    
    function handleSubmit(e){
        e.preventDefault();
        axios.post('http://localhost:3001/create', {name})
        .then(res=>{
            console.log(res);
            navigate('/')
        }).catch(err=>console.log(err))
    }
  return (
   <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
            <h2>Add Task to Database</h2>
            <div className="mb-2">
                <label htmlFor=""><strong>Your Task</strong></label>
                <input type="text" className='form-control' placeholder='Enter your Task' 
                onChange={(e)=>setName(e.target.value)}/>
            </div>
            <button type="submit" className='btn btn-success'>Submit</button>
        </form>
    </div>
   </div>
  )
}

export default CreateStudent