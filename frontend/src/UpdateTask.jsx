import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateTask() {
    const [name, setName] = useState('')
    const {id} = useParams();
    const navigate = useNavigate();
    
    function handleSubmit(e){
        e.preventDefault();
        axios.put('http://localhost:3001/update/'+id, {name})
        .then(res=>{
            console.log(res);
            navigate('/')
        }).catch(err=>console.log(err))
    }
  return (
   <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
            <h2>Update Task to Database</h2>
            <div className="mb-2">
                <label htmlFor=""><strong>Name</strong></label>
                <input type="text" className='form-control' placeholder='Enter the Task' 
                onChange={(e)=>setName(e.target.value)}/>
            </div>
            
            <button type="submit" className='btn btn-success'>Update</button>
        </form>
    </div>
   </div>
  )
}

export default UpdateTask