import { useState, useEffect } from "react";

import datas from "./sample.json";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", age: "", city: "" });
  const [newDiv, setNewDiv] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const getUsers = () => {
    try {
      setUsers(datas);
      setFilterUser(datas);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    const filter = users.filter(
      (user) =>
        user.name.toLowerCase().includes(text) ||
        user.city.toLowerCase().includes(text)
    );
    setFilterUser(filter);
  };

  const del = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setFilterUser(updatedUsers);
  };

  const add = () => {
    setNewUser({ name: "", age: "", city: "" });
    setEditingUser(null);
    setNewDiv(true);
  };

  const close = () => {
    setNewDiv(false);
  };

  const handleData = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (newUser.name && newUser.age && newUser.city) {
      if (editingUser) {
        const updatedUsers = users.map((user) =>
          user.id === editingUser.id ? { ...newUser, id: editingUser.id } : user
        );
        setUsers(updatedUsers);
        setFilterUser(updatedUsers);
      } else {
        const updatedUsers = [...users, { ...newUser, id: users.length + 1 }];
        setUsers(updatedUsers);
        setFilterUser(updatedUsers);
      }
      setNewDiv(false);
    } else {
      console.error("Please fill in all fields.");
    }
  };

  const edit = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setNewUser(userToEdit);
    setEditingUser(userToEdit);
    setNewDiv(true);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="container">
        <h3>CRUD Application</h3>
        <div className="input">
          <input
            type="search"
            placeholder="Search details"
            onChange={handleSearch}
          />
          <button className="btn green" onClick={add}>
            Add Record
          </button>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Name</th>
                <th>Age</th>
                <th>City</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filterUser &&
                filterUser.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.city}</td>
                    <td>
                      <button
                        className="btn green"
                        onClick={() => edit(user.id)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button className="btn red" onClick={() => del(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {newDiv && (
            <div className="model">
              <div className="content">
                <span className="close" onClick={close}>
                  &times;
                </span>
                <h2>User Record</h2>
                <div className="divinput">
                  <label htmlFor="inputname">FullName </label>
                  <input
                    type="text"
                    name="name"
                    id="inputname"
                    value={newUser.name}
                    onChange={handleData}
                  ></input>
                </div>
                <div className="divinput">
                  <label htmlFor="inputage">Age </label>
                  <input
                    type="text"
                    name="age"
                    id="inputage"
                    value={newUser.age}
                    onChange={handleData}
                  ></input>
                </div>
                <div className="divinput">
                  <label htmlFor="inputcity">City </label>
                  <input
                    type="text"
                    name="city"
                    id="inputcity"
                    value={newUser.city}
                    onChange={handleData}
                  ></input>
                </div>
                <button className="btn green" onClick={handleSubmit}>
                  {editingUser ? "Update" : "Add"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
