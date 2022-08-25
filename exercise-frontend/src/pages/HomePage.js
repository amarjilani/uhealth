import React from 'react';
import ExerciseList from '../components/ExerciseList';
import MealList from '../components/MealList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function HomePage({ setData }) {

    let setExercise = setData[0]
    let setMeal = setData[1]
    // Use the history for updating
    const history = useHistory();

    // Use state to bring in the data
    const [exercise, setExercises] = useState([]);

    // RETRIEVE the list of exercises
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    } 
    

    // UPDATE an exercise
    const onEditExercise = async exercise => {
        setExercise(exercise);
        history.push("/edit-exercise");
    }


    // DELETE an exercise  
    const onDeleteExercise = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`)
        }
    }

    const [meal, setMeals] = useState([]);

    // RETRIEVE the list of exercises
    const loadMeals = async () => {
        const response = await fetch('/meals');
        const meals = await response.json();
        setMeals(meals);
    } 
    

    // UPDATE an exercise
    const onEditMeal = async meal => {
        setMeal(meal);
        history.push("/edit-meal");
    }


    // DELETE an exercise  
    const onDeleteMeal = async _id => {
        const response = await fetch(`/meals/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/meals');
            const meals = await getResponse.json();
            setMeals(meals);
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD the exercise
    useEffect(() => {
        loadExercises();
        loadMeals();
    }, []);

    // DISPLAY the exercises
    return (
        <>
        <Container>
            <Row>
            <Col>
            <article>
                <h2>Your Exercises</h2>
                <p>Here's your progress so far. Keep it up!</p>
                <ExerciseList 
                    exercises={exercise} 
                    onEdit={onEditExercise} 
                    onDelete={onDeleteExercise} 
                />
            </article>
            </Col>
            <Col>
            <article>
                <h2>Your Meals</h2>
                <p>Here's what you've been eating!</p>
                <MealList 
                    meals={meal} 
                    onEdit={onEditMeal} 
                    onDelete={onDeleteMeal} 
                />
            </article>
            </Col>
            </Row>
            </Container>
        </>
    );
}

export default HomePage;