import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addData = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("http://localhost:5000/users", {
        user_name: userName,
        email: email,
        password: password,
      });
      navigate("/");
      console.log(resp.data);
    } catch (err) {
      console.log("Error occured from add data method: ", err);
    }
  };

  return (
    <div className="container">
      <h3>AddUser</h3>
      <form onSubmit={addData}>
        <div className="mb-3">
          <label htmlFor="disabledTextInput" className="form-label">
            Username
          </label>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            className="form-control"
            placeholder="username"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="disabledTextInput" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Valid email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="disabledTextInput" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Valid Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Insert Data
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
export default AddUser;
