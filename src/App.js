import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
