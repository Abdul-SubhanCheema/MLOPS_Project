import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherPredictor from './weather'; 
import SignUp from './signup';
import Login from './login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<WeatherPredictor />} />
      </Routes>
    </Router>
  );
}

export default App;
