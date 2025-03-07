import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



function Todolist() {
    const [student, setStudent] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/')
        .then(res => setStudent(res.data))
        .catch(err=> console.log(err.response))
        },[])

    const handleDelete = async (id)=>{
        try{
            await axios.delete('http://localhost:3001/task/'+id)
            window.location.reload()
        }catch(err){
            console.log(err);
        }

    }
  return (
    <>
    
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      
        <div className='w-50 bg-white rounded p-3 ' >
        <h1 className="d-flex justify-content-center "> Todo List</h1>
            <Link to='/create' type="submit" className='btn btn-success '>Add Task</Link>
            <table className='table'>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student.map((data,i)=>(
                            <tr key={i}>
                                <td >{data.Name}</td>
                                <td>
                                    <Link to={`update/${data.ID}`} className='btn btn-primary'>Update</Link>
                                    <button className='btn btn-danger ms-5' onClick={ e => handleDelete(data.ID)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
}

export default Todolist