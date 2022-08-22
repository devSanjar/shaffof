import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Navbar from './Navbar'
import './Home.css'
import Tabs from './Tabs'
import MainSide from './MainSide'
import { loadUsersRequest } from '../redux/actions'

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersRequest())
  }, [dispatch])

  return (
    <div>
      <Navbar />
      <div className="row" style={{ width: '100%', height: '90vh' }}>
        <div className="col-2 p-0 m-0 col-tab-side">
          <Tabs />
        </div>

        <div className="col p-0 m-0" style={{ background: '#f9f9f9' }}>
          <MainSide />
        </div>

      </div>
    </div>
  )
}

export default Home