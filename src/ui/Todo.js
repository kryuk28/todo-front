import React, {useState, useEffect} from 'react';

const Todolist = ({token, setToken}) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const tasksInDb = await response.json();
        setTasks([...tasks, ...tasksInDb]);
      }
    };
    getTasks();
  }, [setTasks]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const handleAddTask = async (title) => {
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({title}),
    });
    if (response.ok) {
      const task = await response.json();
      setTasks([...tasks, task]);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setTasks(tasks.filter((task) => task._id !== taskId));
    }
  };

  const handleGetTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const tasks = await response.json();
      setTasks(tasks);
    }
  };

  return !!token ? (
    <div>
      <h1>To-Do List</h1>
      <button type='button' onClick={handleLogout}>
        Logout
      </button>
      <br />
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask(e.target.title.value);
          e.target.title.value = '';
        }}
      >
        <label>
          New Task:
          <input type='text' name='title' />
        </label>
        <button type='submit'>Add</button>
      </form>
      <br />
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}{' '}
            <button type='button' onClick={() => handleDeleteTask(task._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <br />
      <br />
      <button type='button' onClick={handleGetTasks}>
        Refresh Tasks
      </button>
      <br />
      <br />
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button type='button' onClick={() => handleDeleteTask(task._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    'you have to authorize first'
  );
};

export default Todolist;
