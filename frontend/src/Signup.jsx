import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Validation } from './SignupValidation';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setErrors(Validation(values));
  }, [values]); // Run validation whenever values change

  function handleSubmit(event) {
    event.preventDefault();

    // Use the values from the form
    const data = {
        name: values.name,
        email: values.email,
        password: values.password
    };

    fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      navigate('/'); // Navigate to the home page or wherever you want to redirect after successful signup
    })
    .catch((error) => console.error('Error:', error));
}



  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name"><strong>Name</strong></label>
            <input type="text" name="name" placeholder="Enter your Name" className="form-control rounded-0" onChange={handleInput} />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" name="email" placeholder="Enter your Email" className="form-control rounded-0" onChange={handleInput} />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" name="password" placeholder="Enter your Password" className="form-control rounded-0" onChange={handleInput} />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-success w-100"><strong>Sign Up</strong></button>
          <p>You agree to our Terms and Policies</p>
          <Link to="/" className="btn btn-default border w-100 bg-light text-decoration-none"><strong>Login</strong></Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
