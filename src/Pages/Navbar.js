import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { MdOutlineArrowDropDown } from 'react-icons/md';

const Navbar = () => {
  return (
    <div >
      <nav className="navbar navbar-expand-lg bg-light navbar-style">
        <div className="container-fluid">
          <Link to='/login' className="navbar-brand">
            <h3 className='logo'>SHAFFOF QURILISH</h3>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className='d-flex ms-auto'>
              <img className='navbar-user-image' src={'/img/face1.png'} alt="" />
              <div className='ms-3'>
                <p className='m-0 user-name'>Luke Asote</p>
                <p className='m-0 user-role '>Admin for Associations</p>
              </div>
              <MdOutlineArrowDropDown className='icon' />
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar