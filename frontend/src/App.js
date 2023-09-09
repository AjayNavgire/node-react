import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch the list of users from the API
    axios.get('/api/v1/users').then((response) => {
      setUsers(response.data.users);
    });
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;

    // Send a PUT request to update the user
    axios.put(`/api/v1/user/${selectedUser._id}`, { name, email }).then((response) => {
      
      const updatedUsers = users.map((user) =>
        user._id === response.data.user._id ? response.data.user : user
      );

      setUsers(updatedUsers);
      setSelectedUser(null);
      setName('');
      setEmail('');
    });
  };

  return (
    <div className="App">
      <h1>User Management App</h1>
      <div className="user-list">
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id} onClick={() => handleUserClick(user)}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="user-details">
        <h2>Edit User</h2>
        {selectedUser && (
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleUpdateUser}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
