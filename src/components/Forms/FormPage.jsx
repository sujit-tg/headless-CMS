import React, { useState } from "react";
import "./FormPage.css";

const FormPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("https://gos-testing.tantra-gyan.com/wp-json/react/v1/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("✅ Form submitted successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Submission failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("⚠️ Error connecting to server.");
    }
  };

  return (
    <div className="form-container">
      <h2>📝 Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
      {status && <p className="status-text">{status}</p>}
    </div>
  );
};

export default FormPage;
