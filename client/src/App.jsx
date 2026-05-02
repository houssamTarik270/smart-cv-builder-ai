/* client/src/App.jsx */
import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // L-ma3loumat dyal CV
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    aboutMe: '',
    experience: '',
    education: '',
    skills: ''
  });

  // Melli l-user kiy-kteb
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Melli l-user kiy-sajjel CV f Database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/cv', formData);
      alert('Success! Your structured CV has been saved to the Cloud! 🔥🚀');
      console.log('Server response:', response.data);
    } catch (error) {
      alert('Error saving CV. Check console.');
      console.error('Connection error:', error);
    }
  };

  // L-IA kat-dkhl t-sayeb l-khidma
  const generateAISuggestion = async () => {
    if (!formData.aboutMe && !formData.experience) {
      alert("Please write something in 'About Me' or 'Experience' first! (Kteb chwya b3da bach l-IA t-fhem)");
      return;
    }

    try {
      alert("🤖 AI is thinking... ");
      
      const response = await axios.post('http://localhost:5000/api/ai/optimize', {
        text: formData.aboutMe || formData.experience,
        field: formData.aboutMe ? 'Professional Summary' : 'Work Experience'
      });

      // Kan-beddlo l-text l-9dim b l-text l-jdid dyal l-IA
      if (formData.aboutMe) {
        setFormData({ ...formData, aboutMe: response.data.optimizedText });
      } else {
        setFormData({ ...formData, experience: response.data.optimizedText });
      }
      
      alert("AI Optimization Complete! ✨ L-text wlla Pro!");
    } catch (error) {
      console.error("AI Error:", error);
      alert("AI optimization failed. try later");
    }
  };

  return (
    <div className="main-container">
      
      {/* 🤖 Header & AI Suggestion Interface */}
      <div className="header-section">
        <h1>Smart CV Builder AI 🦾</h1>
      </div>

      <div className="ai-assistant-card">
        <div className="ai-icon">🤖</div>
        <div className="ai-content">
          <h3>AI Co-Pilot is Ready</h3>
          <p>Fill in the basics, then click below. I will optimize your text for ATS and suggest better job descriptions based on your skills.</p>
        </div>
        <button type="button" className="btn-generate-ai" onClick={generateAISuggestion}>
          Optimize with AI ✨
        </button>
      </div>

      {/* 📄 Real Structured CV Form */}
      <form onSubmit={handleSubmit} className="cv-form">
        
        {/* Section 1: Contact Info */}
        <div className="form-section">
          <h2 className="form-section-title">Personal Information</h2>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} placeholder="John Doe" onChange={handleChange} required />
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <div className="input-group">
              <label>Professional Email</label>
              <input type="email" name="email" value={formData.email} placeholder="john.doe@email.com" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} placeholder="+1-123-456-7890" onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Section 2: Summary */}
        <div className="form-section">
          <h2 className="form-section-title">Professional Summary</h2>
          <div className="input-group">
            <label>About Me (Let AI help you write this)</label>
            <textarea name="aboutMe" value={formData.aboutMe} rows="4" placeholder="A brief summary of your career... (Ex: I am a student at EST...)" onChange={handleChange}></textarea>
          </div>
        </div>

        {/* Section 3: Experience */}
        <div className="form-section">
          <h2 className="form-section-title">Work Experience</h2>
          <div className="input-group">
            <label>Detailed Experience</label>
            <textarea name="experience" value={formData.experience} rows="5" placeholder="Company Name - Role - Key Responsibilities..." onChange={handleChange}></textarea>
          </div>
        </div>

        {/* Section 4: Skills */}
        <div className="form-section">
          <h2 className="form-section-title">Technical Skills</h2>
          <div className="input-group">
            <label>Skills List (Comma separated)</label>
            <input type="text" name="skills" value={formData.skills} placeholder="React, Node.js, Python, Laravel" onChange={handleChange} />
          </div>
        </div>

        {/* Section 5: Education */}
        <div className="form-section">
          <h2 className="form-section-title">Education</h2>
          <div className="input-group">
            <label>University / Degree</label>
            <input type="text" name="education" value={formData.education} placeholder="DUT Génie Informatique, EST" onChange={handleChange} />
          </div>
        </div>

        <div className="submit-btn-container">
          <button type="submit" className="save-btn">Save Structured CV</button>
        </div>
      </form>
    </div>
  );
}

export default App;