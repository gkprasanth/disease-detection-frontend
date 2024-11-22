import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PlantDisease from './pages/PlantDisease';
import SkinDisease from './pages/SkinDisease';
import Navbar from './components/Navabar';
 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plant-disease" element={<PlantDisease />} />
        <Route path="/skin-disease" element={<SkinDisease />} />
      </Routes>
    </Router>
  );
}

export default App;
