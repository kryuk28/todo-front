import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {url} from '../../api';
import {Form, Button, Container, Row, Col, Card, Alert} from 'react-bootstrap';
import NotificationMessage from '../components/NotificationMessage';

const Register = ({token}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    });
    if (response.ok) {
      console.log('User registered successfully!');
      setUsername('');
      setPassword('');
      navigate('/login');
    } else {
      console.error('Error registering user');
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return !token ? (
    <Container style={{paddingTop: '15%'}}>
      <Row style={{justifyContent: 'center'}}>
        <Col xl='6' lg='6' md='8'>
          <Card style={{padding: '2rem'}}>
            <h1>Register</h1>
            <br />
            <Form onSubmit={handleRegister}>
              <Form.Group controlId='formUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <br />
              <Form.Group controlId='formPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <br />
              <div style={{textAlign: 'center', padding: '1rem'}}>
                <Button variant='primary' style={{width: '70%'}} type='submit'>
                  Register
                </Button>
              </div>
              <div style={{textAlign: 'center'}}>
                <Alert.Link onClick={navigateToLogin}>
                  Already a user
                </Alert.Link>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <NotificationMessage>
      <p>You're already registered</p>
      <Button variant='primary' onClick={() => navigate('/login')}>
        Go to login
      </Button>
    </NotificationMessage>
  );
};

export default Register;
