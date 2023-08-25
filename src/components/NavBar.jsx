import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
        navigate('/');
        console.log('Signed out successfully');
        console.log(user);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const goToSignin = () => {
    navigate('/signin');
  };

  return (
    <>
      <Navbar className="navbar" bg="dark" data-bs-theme="dark">
        <Container>
          <div className="nav-left">
            <div>
              <Nav className="nav-logo mr-auto">
                <Nav.Link as={Link} to="/">
                  BOOKING APP
                </Nav.Link>

                {user && (
                  <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/profile">
                      Profile
                    </Nav.Link>
                    <Nav.Link as={Link} to="/search">
                      Search
                    </Nav.Link>
                    <Nav.Link as={Link} to="/appointments">
                      Appointments
                    </Nav.Link>
                  </Nav>
                )}
              </Nav>
            </div>
          </div>
          {user ? (
            <Button onClick={handleLogout} variant="light">
              Sign Out
            </Button>
          ) : (
            <Button onClick={goToSignin} variant="light">
              Sign In
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
