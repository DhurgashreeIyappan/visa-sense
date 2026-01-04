import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BenefitsDashboard from './pages/BenefitsDashboard';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<BenefitsDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
