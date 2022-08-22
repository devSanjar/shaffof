import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { FaUsers } from 'react-icons/fa'
import { TbLogout } from 'react-icons/tb'
import './Tabs.css'

const Tabs = () => {
  return (
    <ul className="list-group">
      <li className="list-group-item active">
        <div className="px-3 d-flex align-items-center">
          <FaUserAlt className='iconx' /> <p className='m-0 ms-3'> Users </p>
        </div>
      </li>
      <li className="list-group-item active act">
        <div className="px-3 d-flex align-items-center">
          <FaUsers className='iconx' /> <p className='m-0 ms-3'> Users </p>
        </div>
      </li>
      <li className="list-group-item active">
        <div className="px-3 d-flex align-items-center">
          <TbLogout className='iconx' /> <p className='m-0 ms-3'>Profile</p>
        </div>
      </li>
    </ul>
  )
}

export default Tabs