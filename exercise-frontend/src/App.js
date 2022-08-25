// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Components, styles, media
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import AddMealPage from './pages/AddMealPage';
import EditMealPage from './pages/EditMealPage';

// Define the function that renders the content in routes using State.
function App() {

  const [exercise, setExercise] = useState([]);
  const [meal, setMeal] = useState([]);

  return (
    <>
      <Router>

          
          <header>
            <Container>
              <Row>
            <Col><img src="../menexercise.png" width="400" height="200"></img></Col>
            <Col> <Navigation /></Col>
            <Col><img src='../womenexercise.png' width="400" height="200"></img></Col>
              </Row>
            </Container>
          </header>

          

          <main>
            <Route path="/" exact>
              <HomePage setData={[setExercise, setMeal]} />
            </Route>

            <Route path="/add-exercise">
              <AddExercisePage />
            </Route>

            <Route path="/add-meal">
              <AddMealPage />
            </Route>
            
            
            <Route path="/edit-exercise">
              <EditExercisePage exercise={exercise} />
            </Route>

            <Route path="/edit-meal">
              <EditMealPage meal={meal} />
            </Route>
          </main>

          <footer>
            <p>&copy; 2022 Amar Jilani</p>
          </footer>

      </Router>
    </>
  );
}

export default App;