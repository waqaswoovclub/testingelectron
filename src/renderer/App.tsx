import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Home from './Home';
import Menu from '../components/Menu';

export default function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
