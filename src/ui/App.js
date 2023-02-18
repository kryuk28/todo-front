import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Todolist from './Todo';

const App = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // const handleLogin = async () => {
  //   const response = await fetch('http://localhost:5000/users/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({username, password}),
  //   });
  //   if (response.ok) {
  //     const data = await response.json();
  //     setToken(data.token);
  //     localStorage.setItem('token', data.token);
  //     setUsername('');
  //     setPassword('');
  //   }
  // };

  // const handleLogout = () => {
  //   setToken(null);
  //   localStorage.removeItem('token');
  // };

  // const handleAddTask = async (title) => {
  //   const response = await fetch('http://localhost:5000/tasks', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({title}),
  //   });
  //   if (response.ok) {
  //     const task = await response.json();
  //     setTasks([...tasks, task]);
  //   }
  // };

  // const handleDeleteTask = async (taskId) => {
  //   const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
  //     method: 'DELETE',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   if (response.ok) {
  //     setTasks(tasks.filter((task) => task._id !== taskId));
  //   }
  // };

  // const handleGetTasks = async () => {
  //   const response = await fetch('http://localhost:5000/tasks', {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   if (response.ok) {
  //     const tasks = await response.json();
  //     setTasks(tasks);
  //   }
  // };

  // if (!token) {
  //   return (
  //     <Login setToken={setToken} />
  // <div>
  //   <h1>Login</h1>
  //   <form>
  //     <label>
  //       Username:
  //       <input
  //         type='text'
  //         value={username}
  //         onChange={(e) => setUsername(e.target.value)}
  //       />
  //     </label>
  //     <br />
  //     <label>
  //       Password:
  //       <input
  //         type='password'
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //     </label>
  //     <br />
  //     <button type='button' onClick={handleLogin}>
  //       Login
  //     </button>
  //     <button type='button'>New user</button>
  //   </form>
  // </div>
  //   );
  // }

  // sadsada

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/todolist'
          element={<Todolist token={token} setToken={setToken} />}
        />
      </Routes>
    </Router>
    // <div>
    //   <h1>To-Do List</h1>
    //   <button type='button' onClick={handleLogout}>
    //     Logout
    //   </button>
    //   <br />
    //   <br />
    //   <form
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       handleAddTask(e.target.title.value);
    //       e.target.title.value = '';
    //     }}
    //   >
    //     <label>
    //       New Task:
    //       <input type='text' name='title' />
    //     </label>
    //     <button type='submit'>Add</button>
    //   </form>
    //   <br />
    //   <ul>
    //     {tasks.map((task) => (
    //       <li key={task._id}>
    //         {task.title}{' '}
    //         <button type='button' onClick={() => handleDeleteTask(task._id)}>
    //           Delete
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    //   <br />
    //   <br />
    //   <button type='button' onClick={handleGetTasks}>
    //     Refresh Tasks
    //   </button>
    //   <br />
    //   <br />
    //   <ul>
    //     {tasks.map((task) => (
    //       <li key={task._id}>
    //         {task.title}
    //         <button type='button' onClick={() => handleDeleteTask(task._id)}>
    //           Delete
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default App;
