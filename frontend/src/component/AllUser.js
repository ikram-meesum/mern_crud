import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { LuEdit2 } from "react-icons/lu";
import toast, { Toaster } from "react-hot-toast";

const AllUser = () => {
  const [student, setStudent] = useState([]);

  async function getData() {
    try {
      const res = await axios("http://localhost:5000/users");
      setStudent(res.data);
    } catch (err) {
      console.log("Error occured from getdata method: ", err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const deleteData = async (userid) => {
    console.log(userid);
    try {
      const result = await axios.delete(
        `http://localhost:5000/users/${userid}`
      );
      console.log("delete document: ", result.data);
      setStudent(student.filter((item) => item._id !== userid));
      toast.success("Record has been deleted successfully.");
    } catch (err) {
      console.log("Error occured from delete function: ", err);
    }
  };

  return (
    <div className="container">
      <h3 className="mb-4 mt-5 text-primary">MERN Stack CRUD Application</h3>
      <table className="table table-striped table-hover">
        <thead>
          <tr className="table-dark">
            <th scope="col">S#</th>
            <th scope="col">User Id</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Edit</th>
            <th scope="col">Del</th>
          </tr>
        </thead>
        <tbody>
          {student.length > 0 &&
            student.map((data, ind) => {
              return (
                <tr key={ind}>
                  <th scope="row">{ind + 1}</th>
                  <td>{data._id}</td>
                  <td>{data.user_name}</td>
                  <td>{data.email}</td>
                  <td>{data.password}</td>
                  <td>
                    <Link to={`/edit/${data._id}`}>
                      <LuEdit2 color="blue" />
                    </Link>
                  </td>
                  <td>
                    <Link to={"/"}>
                      <AiOutlineDelete
                        onClick={() => deleteData(data._id)}
                        color="red"
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
};
export default AllUser;
