import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'  // create diff URL routes to diff components
import 'bootstrap/dist/css/bootstrap.min.css' // provide styling

// Created components
import MovieList from './components/movie-list';
import Movie from './components/movie';
import AddReview from './components/add-review';
import Login from './components/login';

// React-Bootstrap Components
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function App() {
  const [user, setUser] = React.useState(null)
  // useState lets a React function component store and update its state (e.g., logged in or out)
  // useState returns array with 2 values: current state & function to update

  async function login(user = null) {  // default user to null
    setUser(user)
  }
  async function logout() {
    setUser(null) // set user to null
  }


  return (    // return a single React element <div />
    <div className="App">

      {/* Navbar */}
      <Navbar bg="black" variant="dark" expand="md" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">
            🎬 Movie Reviews
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>
            </Nav>

            <Nav>
              {user ? (
                <>
                  <Navbar.Text className="me-4">Hello, {user.name}</Navbar.Text>
                  <Button variant="outline-light" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button as={Link} to="/login" variant="outline-light">
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Routes */}
      <Routes>
        <Route
          path={"/"}
          element={<MovieList />}
        />

        <Route
          path={"/movies"}
          element={<MovieList />}
        />

        <Route
          path="/movies/id/:id/review"
          element={<AddReview user={user} />}
        />

        <Route
          path="/movies/id/:id"
          element={<Movie user={user} />}
        />

        <Route
          path="/login"
          element={<Login login={login} />}
        />
        {/* pass in login function as prop, this allow function to be called from Login component thus populate the user state variable  */}

      </Routes>



    </div>
  );
}

export default App;
