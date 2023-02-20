import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {url} from '../../api';
import {Form, Button, Row, Col, Container, Card} from 'react-bootstrap';
import NotificationMessage from '../components/NotificationMessage';

const Login = ({token, setToken}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    });
    if (response.ok) {
      const data = await response.json();
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setUsername('');
      setPassword('');
      navigate('/');
    }
  };

  const redirectToRegister = () => {
    navigate('/register');
  };

  return !token ? (
    <Container style={{paddingTop: '15%'}}>
      <Row style={{justifyContent: 'center'}}>
        <Col xl='6' lg='6' md='8'>
          <Card style={{padding: '2rem'}}>
            <h1>Login</h1>
            <br />
            <Form>
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
              <Row style={{margin: '2rem 0 1rem 0'}}>
                <Col sm='6'>
                  <Button
                    variant='primary'
                    type='submit'
                    style={{width: '100%'}}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>{' '}
                </Col>
                <Col sm='6'>
                  <Button
                    variant='secondary'
                    type='button'
                    onClick={redirectToRegister}
                    style={{width: '100%'}}
                  >
                    New user
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <NotificationMessage>
      <p>You're already logged in</p>
      <Button variant='primary' onClick={() => navigate('/')}>
        Go to my page
      </Button>
    </NotificationMessage>
  );
};

export default Login;
