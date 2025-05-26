import './App.css'
import BrandDetailsDisplay from './BrandDetailsDisplay';
import Home from './Home';
import InstagramDetailsPage from './InfluencerDetailsPage';
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
        <Route path="/brand-details" element={<BrandDetailsDisplay />} />
        <Route path="/influencer" element={<InstagramDetailsPage />} />
      </Routes>
   </Router>
  )
}

export default App
