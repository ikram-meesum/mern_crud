import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function EditUser() {
  const { sid } = useParams();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function getData() {
    axios
      .get(`http://localhost:5000/users/${sid}`)
      .then((res) => {
        setUserName(res.data[0].user_name);
        setEmail(res.data[0].email);
        setPassword(res.data[0].password);
        console.log(res.data[0]);
      })
      .catch((error) => {
        console.log("Error occured from get data method: ", error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const updateData = async (e) => {
    e.preventDefault();

    // async await is not working properly on update data
    axios
      .put(`http://localhost:5000/users/${sid}`, {
        user_name: userName,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error occured from udate method: ", error);
      });
    toast.success("Record has been updated successfully.");

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="container">
      <h3 className="mb-4 mt-5 text-success">Edit User</h3>

      <form onSubmit={updateData} action="">
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
            placeholder="Email"
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
          Update Data
        </button>
      </form>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "red",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "red",
            },
          },
        }}
      />
    </div>
  );
}
