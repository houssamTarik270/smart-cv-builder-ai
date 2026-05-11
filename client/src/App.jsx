import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Builder from './pages/Builder'; // ✅ Path jdid
import ProtectedRoute from './components/ProtectedRoute';

function App() { // Smiya App bach t-ji sahla f main.jsx
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* 🔐 Hna l-7imaya: L-builder m-7mi b l-ProtectedRoute [cite: 49, 131] */}
        <Route 
          path="/builder" 
          element={
            <ProtectedRoute>
              <Builder />
            </ProtectedRoute>
          } 
        />
        
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;