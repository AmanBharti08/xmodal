import React, { useState, useEffect, useRef } from "react";
import "./Modal.css";

const Modal = () => {
  const [modalChange, setModalChange] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const modalRef = useRef(null);

  const handleClick = () => {
    setModalChange(!modalChange);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;
    const currentDate = new Date();
    const inputDate = new Date(dob);

    if (inputDate > currentDate) {
      window.alert("Invalid Date of Birth, it cannot be in the future.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      window.alert(
        "Invalid phone number. Please enter a 10-digit phone number."
      );
      return;
    }

    if (e.target.checkValidity()) {
      setModalChange(false); // Close the modal if everything is valid
      console.log("Form submitted successfully");
    } else {
      e.target.reportValidity(); // Trigger default validation for other fields
    }
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
      setModalChange(false); // Close modal on outside click
    }
  };

  useEffect(() => {
    if (modalChange) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup
    };
  }, [modalChange]);

  return (
    <div className="modal-container">
      <h1>User Detail Modal</h1>
      <button onClick={handleClick}>Open Form</button>

      {modalChange && (
        <>
          <div className="modal-overlay"></div>

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
                pattern=".+@.+\..+"
                required
                title="Please enter a valid email address."
              />

              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                title="Please enter a 10-digit phone number."
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
        </>
      )}
    </div>
  );
};

export default Modal;
