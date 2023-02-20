import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Todo from '../pages/Todo';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route
          path='/login'
          element={<Login token={token} setToken={setToken} />}
        />
        <Route path='/register' element={<Register token={token} />} />
        <Route path='/' element={<Todo token={token} setToken={setToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
