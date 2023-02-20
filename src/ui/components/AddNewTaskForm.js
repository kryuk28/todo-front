import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {url} from '../../api';

const AddNewTaskForm = ({tasks, setTasks, token}) => {
  const handleAddTask = async (title) => {
    const response = await fetch(`${url}/tasks`, {
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

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTask(e.target.title.value);
        e.target.title.value = '';
      }}
    >
      <Form.Group className='mb-3' controlId='formNewTask'>
        <Form.Label>New Task:</Form.Label>
        <Form.Control type='text' name='title' />
      </Form.Group>
      <Button type='submit'>Add</Button>
    </Form>
  );
};

export default AddNewTaskForm;
