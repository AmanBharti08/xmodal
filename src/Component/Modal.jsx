import React, { useRef, useState, useEffect } from "react";

import "./Modal.css";

const Modal = () => {
  const [modalState, setModalState] = useState(false);
  const formRef = useRef();

  const openformbutton = () => {
    console.log("form Opened")
    setModalState(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const phoneInput = form.querySelector("#phone");
    const phoneNumber = phoneInput.value;

    if (phoneNumber.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const dobInput = form.querySelector("#dob");
    const selectedDate = new Date(dobInput.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
      return;
    }

    setModalState(false);
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const closeModal = () => {
    setModalState(false);
  };

  useEffect(() => {
    if (modalState) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalState]);

  return (
    <div className="container">
      <h1>User Details Modal</h1>
      <button onClick={openformbutton}>Open Form</button>
      {modalState && (
        <div className="modal">
          <div className="modal-content">
          <div className="background"></div>
            <form ref={formRef}>
              <h2>Fill Details</h2>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" required />
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                required
                placeholder="xyz@domain.com"
              />
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="phone"
                id="phone"
                required
                placeholder="9123456789"
              />
              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" id="dob" required />
              <button className="submit-button" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
