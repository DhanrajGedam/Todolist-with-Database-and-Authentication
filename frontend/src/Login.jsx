// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Validation } from './LoginValidation';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await Validation(values);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        navigate('/Todolist');
        console.log('Success:', data);
        // Handle successful login (e.g., redirect to a dashboard)
      } catch (error) {
        console.error('Error:', error);
        // Handle login error (e.g., display an error message)
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-primary  vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2>Sign in</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email"> <strong>Email</strong></label>
              <input type="email" placeholder="Enter your Email" name='email' value={values.email} onChange={handleInput} className='form-control rounded-0' />
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="password"> <strong>Password</strong></label>
              <input type="password" placeholder="Enter your Password" name='password' value={values.password} onChange={handleInput} className='form-control rounded-0' />
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <button type="submit" className="btn btn-success w-100"> <strong>Login</strong> </button>
            <p>You agree to our Terms and Policies</p>
            <Link to="/signup" type="submit" className="btn btn-default border w-100 bg-light text-decoration-none"> <strong>Create Account</strong> </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;
