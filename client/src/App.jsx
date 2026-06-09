import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Builder from './pages/Builder';
import Historique from './pages/Historique'; // 🌟 ZIDNA L-IMPORT HNA
import ProtectedRoute from './components/ProtectedRoute';

function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* 🔐 Hna l-7imaya: L-builder m-7mi b l-ProtectedRoute */}
        <Route 
          path="/builder" 
          element={
            <ProtectedRoute>
              <Builder />
            </ProtectedRoute>
          } 
        />

        {/* 🌟 HNA ZIDNA L-ROUTE DYAL HISTORIQUE 🌟 */}
        <Route 
          path="/historique" 
          element={
            <ProtectedRoute>
              <Historique />
            </ProtectedRoute>
          } 
        />
        
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;