import React, { useRef, useState } from "react";

import "./Modal.css";

const Modal = () => {
  const [modalState, setModalState] = useState(false);
  const formRef = useRef();

  const openformbutton = () => {
    setModalState(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    if (!form.checkValidity()) {
      form.reportValidity();
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
  return (
    <div className="modal">
      <h1>User Details Modal</h1>
      <button onClick={openformbutton}>Open Form</button>
      {modalState && (
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
            <input type="phone" id="phone" required placeholder="9123456789" />
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" required />
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Modal;
