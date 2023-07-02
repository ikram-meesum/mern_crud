import AllUser from "./component/AllUser.js";
import AddUser from "./component/AddUser.js";
import EditUser from "./component/EditUser.js";
import Navbar from "./component/Navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllUser />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/edit/:sid" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
