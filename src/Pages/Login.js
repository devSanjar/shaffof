import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'


function Login() {
  return (
    <div className="row" style={{ height: '100vh', width: '100.7%' }}>

      <div className="col d-flex justify-content-center align-items-center">
        <div style={{ marginLeft: '35%', marginBottom: '20%' }}>
          <h1 className='text-center main-text'>LOGIN</h1>
          <div className="input-group mb-3">
            <input type="text" className="form-control input-style" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <input type="password" className="form-control input-style" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
          </div>
          <Link to='/' className="btn btn-primary w-100 login-button">LOGIN</Link>
        </div>
      </div>

      <div className="col d-flex justify-content-center align-items-center second-col">
        <div style={{ marginRight: '30%', marginBottom: '20%' }}>
          <img className='right-side-logo' src={'/img/logo.png'} alt="logo" />
        </div>
      </div>

    </div>
  )
}

export default Login
