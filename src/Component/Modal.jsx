import React, { useState, useEffect, useRef } from "react";
import "./Modal.css";

const Modal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const modalRef = useRef(null);

  const handleClick = () => {
    setModalOpen(true); // Open modal
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;
    const currentDate = new Date();
    const inputDate = new Date(dob);

    // Validation for empty fields
    if (!username || !email || !phone || !dob) {
      alert("Please fill out all fields.");
      return;
    }

    // Validate email format
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // Validate phone number format
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // Validate date of birth
    if (inputDate > currentDate) {
      alert("Invalid date of birth. It cannot be in the future.");
      return;
    }

    // If all validations pass
    alert("Form submitted successfully!"); // Replace with actual submission logic
    setFormData({ username: "", email: "", phone: "", dob: "" }); // Reset form
    setModalOpen(false); // Close modal
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setModalOpen(false); // Close modal on outside click
    }
  };

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  return (
    <div className="modal">
      <h1>User Detail Modal</h1>
      <button onClick={handleClick}>Open Form</button>
      {modalOpen && (
        <div className="modal-content" ref={modalRef}>
          <h3>Fill Details</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <button className="submit-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Modal;
