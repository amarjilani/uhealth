import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button"

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');
    
    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };


    return (
        <>
        <article>
            <h2>Add a new exercise.</h2>
            <p>Keep track of your hard work!</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>Enter the details of your workout.</legend>
                    <label for="name">Exercise</label>
                    <input
                        type="text"
                        placeholder="Name of the exercise"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name"
                        required/>
                    
                    <label for="reps">Reps</label>
                    <input
                        type="number"
                        value={reps}
                        placeholder="Number of reps"
                        onChange={e => setReps(e.target.value)} 
                        id="reps"
                        required />

                    <label for="weight">Weight</label>
                    <input
                        type="number"
                        placeholder="Weight used"
                        value={weight}
                        onChange={e => setWeight(e.target.value)} 
                        id="weight"
                        required/>
                    
                    <label for="unit">Units</label>
                    <select name="unit" id="unit" onChange={e => setUnit(e.target.value)} required="required">
                        <option value="lbs">lbs</option>
                        <option value="kgs">kgs</option>
                        <option value="miles">miles</option>
                        <option value="km">km</option>
                    </select>
                    
                    <label for="date">Date</label>
                    <input
                        type="date"
                        value={date}
                        placeholder="Date of exercise"
                        onChange={e => setDate(e.target.value)} 
                        id="date"
                        required/>

                    <label for="submit">
                    <Button
                        type="submit"
                        onClick={addExercise}
                        id="submit"
                    >Add your workout!</Button></label>
                </fieldset>
                </form>
            </article>
        </>
    );
}

export default AddExercisePage;