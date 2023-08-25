import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, createUserDocumentFromAuth } from '../firebase';
import { UserContext } from '../UserContext';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';

const Signup = () => {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);

  const { setUser } = userContext



  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('User signed up:', user);
        createUserDocumentFromAuth(user, { username });
        console.log('user added to db');
        navigate('/home');
        updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(() => {
            setUser(user);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <main>
      <div>
        <Container>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              {/* <div className="border border-3 border-primary"></div> */}
              <Card className="shadow">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2">Sign up</h2>
                    <p className=" mb-5">Create a new account</p>
                    <div className="mb-3">
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                          <Form.Label className="text-center">
                            Username
                          </Form.Label>
                          <Form.Control
                            type="text"
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter username"
                            autoComplete="username"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">Email</Form.Label>
                          <Form.Control
                            type="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter email"
                            autoComplete="email"
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter password"
                            autoComplete="off"
                          />
                        </Form.Group>
                        <div className="d-grid">
                          <Button
                            variant="primary"
                            type="submit"
                            onClick={onSubmit}
                          >
                            Create account
                          </Button>
                        </div>
                      </Form>
                      <div className="mt-3">
                        <p className="mb-0  text-center">
                          Already have an account?{' '}
                          <a href="/signin" className="text-primary fw-bold">
                            Sign In
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
};

export default Signup;