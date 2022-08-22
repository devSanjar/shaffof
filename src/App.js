import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './Pages/About';
import Profile from './Pages/Profile';
import Home from './Pages/Home';
import Login from './Pages/Login';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
