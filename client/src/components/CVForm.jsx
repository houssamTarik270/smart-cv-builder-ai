function CVForm({ cvData, setCvData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCvData({
      ...cvData,
      [name]: value,
    });
  };

  return (
    <div className="form-card">
      <h2>CV Information</h2>

      <label>Full Name</label>
      <input
        type="text"
        name="fullName"
        value={cvData.fullName}
        onChange={handleChange}
        placeholder="Enter your full name"
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={cvData.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />

      <label>Phone</label>
      <input
        type="text"
        name="phone"
        value={cvData.phone}
        onChange={handleChange}
        placeholder="Enter your phone number"
      />

      <label>Address</label>
      <input
        type="text"
        name="address"
        value={cvData.address}
        onChange={handleChange}
        placeholder="Enter your address"
      />

      <label>Profile Summary</label>
      <textarea
        name="summary"
        value={cvData.summary}
        onChange={handleChange}
        placeholder="Write a short professional summary"
      ></textarea>
    </div>
  );
}

export default CVForm;