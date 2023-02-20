import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {url} from '../../api';
import {Button, Card, Col, Container, ListGroup, Row} from 'react-bootstrap';
import NotificationMessage from '../components/NotificationMessage';
import SearchForm from '../components/SearchForm';
import AddNewTaskForm from '../components/AddNewTaskForm';
import Task from '../components/Task';

const Todo = ({token, setToken}) => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch(`${url}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const tasksInDb = await response.json();
        setTasks(tasksInDb);
      }
    };
    getTasks();
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return !!token ? (
    <Container className='mt-3'>
      <Row>
        <Col>
          <h1>To-Do List</h1>
        </Col>
        <Col className='text-end'>
          <Button variant='danger' onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      <Card className='mt-3'>
        <Card.Body>
          <AddNewTaskForm tasks={tasks} setTasks={setTasks} token={token} />
        </Card.Body>
      </Card>
      <Card className='mt-3'>
        <Card.Body>
          <Row>
            <Col lg='8' style={{paddingBottom: '2rem'}}>
              <ListGroup>
                {tasks?.length
                  ? tasks.map((task) => (
                      <Task
                        task={task}
                        tasks={tasks}
                        setTasks={setTasks}
                        token={token}
                        key={task._id}
                      />
                    ))
                  : 'No tasks yet'}
              </ListGroup>
            </Col>
            <Col lg='4' style={{paddingBottom: '2rem'}}>
              <SearchForm token={token} setTasks={setTasks} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  ) : (
    <NotificationMessage>
      <p>You have to authorize first</p>
      <Button variant='primary' onClick={() => navigate('/login')}>
        Go to login
      </Button>
    </NotificationMessage>
  );
};

export default Todo;
