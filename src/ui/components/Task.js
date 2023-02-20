import React, {useState} from 'react';
import {Row, Col, Form, ListGroup, Button} from 'react-bootstrap';
import {url} from '../../api';

const Task = ({task, tasks, setTasks, token}) => {
  const [editTask, setEditTask] = useState(null);

  const handleDeleteTask = async (taskId) => {
    const response = await fetch(`${url}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setTasks(tasks.filter((task) => task._id !== taskId));
    }
  };

  const handleEditTask = async (taskId, newTitle) => {
    const response = await fetch(`${url}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({title: newTitle}),
    });
    if (response.ok) {
      const updatedTask = await response.json();
      setTasks(
        tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
      setEditTask(null);
    }
  };

  return (
    <ListGroup.Item key={task._id}>
      {editTask === task._id ? (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditTask(task._id, e.target.newTitle.value);
            e.target.newTitle.value = '';
          }}
        >
          <Row>
            <Col xs='10'>
              <Form.Control
                type='text'
                name='newTitle'
                defaultValue={task.title}
              />
            </Col>
            <Col xs='2'>
              <Button type='submit'>Save</Button>
            </Col>
          </Row>
        </Form>
      ) : (
        <>
          {task.title}
          <div className='float-end'>
            <Button
              variant='warning'
              className='me-2'
              onClick={() => setEditTask(task._id)}
            >
              Edit
            </Button>
            <Button variant='danger' onClick={() => handleDeleteTask(task._id)}>
              Delete
            </Button>
          </div>
        </>
      )}
    </ListGroup.Item>
  );
};

export default Task;
