import React from 'react';
import {Container, Card} from 'react-bootstrap';

const NotificationMessage = ({children}) => {
  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{height: '100vh'}}
    >
      <Card style={{width: '18rem'}}>
        <Card.Body>{children}</Card.Body>
      </Card>
    </Container>
  );
};

export default NotificationMessage;
