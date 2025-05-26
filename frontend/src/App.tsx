import './App.css'
import Home from './Home';
import InfluencerSearchGenerator from './InfluencerSearchGenerator';
import InfluencerSearchForm from './InputForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router';

function App() {
  return (
   <Router>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<InfluencerSearchForm />} />
        <Route path="/search" element={<InfluencerSearchGenerator />} />
      </Routes>
   </Router>
  )
}

export default App
