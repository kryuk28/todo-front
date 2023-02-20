import React, {useState} from 'react';
import {url} from '../../api';
import {Form, Button} from 'react-bootstrap';

const SearchForm = ({token, setTasks}) => {
  const [searchTitle, setSearchTitle] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(searchTitle);
    const response = await fetch(`${url}/tasks?title=${searchTitle}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const tasks = await response.json();
      setTasks(tasks);
    }
  };

  return (
    <Form onSubmit={handleSearch} className='d-flex'>
      <Form.Group controlId='formBasicEmail' className='me-2'>
        <Form.Label>Search task by title:</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter task title'
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Search
      </Button>
    </Form>
  );
};

export default SearchForm;
