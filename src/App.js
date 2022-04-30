import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  // load data
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    // console.log(name, email);
    // const user = {userName: name, userEmail: email}; //property and variable same na hole evabe
    const user = { name, email, phone };

    // post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        const newUsers = [...users, data]; // as react immutable ager user er sathe new user eksathe add kore rakhte hobe
        setUsers(newUsers);
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="App">
      <h1>My own data : {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='Name' required />
        <input type="email" name='email' placeholder='Email' required />
        <input type="number" name='phone' placeholder='Phone' required />
        <input type="submit" value="Add User" />
      </form>
      <ul>
        {users.map(user => <li key={user.id}>Id:
          {user.id} Name: {user.name} Email: {user.email} Phone: {user.phone}</li>)}
      </ul>
    </div>
  );
}

export default App;
