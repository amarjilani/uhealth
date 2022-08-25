import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button"

export const AddMealPage = () => {

    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [date, setDate] = useState('');
    
    const history = useHistory();

    const addMeal = async () => {
        const newMeal = { name, calories, date };
        const response = await fetch('/meals', {
            method: 'post',
            body: JSON.stringify(newMeal),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the meal!");
        } else {
            alert(`Failed to add meal, status code = ${response.status}`);
        }
        history.push("/");
    };


    return (
        <>
        <article>
            <h2>Add a new meal.</h2>
            <p>Keep track of what you eat!</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>Enter your meal.</legend>
                    <label for="name">Meal</label>
                    <input
                        type="text"
                        placeholder="Name of the meal"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name"
                        required/>
                    
                    <label for="reps">Calories</label>
                    <input
                        type="number"
                        value={calories}
                        placeholder="Calories"
                        onChange={e => setCalories(e.target.value)} 
                        id="calories"
                        required />

                    
                    <label for="date">Date</label>
                    <input
                        type="date"
                        value={date}
                        placeholder="Date of meal"
                        onChange={e => setDate(e.target.value)} 
                        id="date"
                        required/>

                    <label for="submit">
                    <Button
                        type="submit"
                        onClick={addMeal}
                        id="submit"
                    >Add your meal!</Button></label>
                </fieldset>
                </form>
            </article>
        </>
    );
}

export default AddMealPage;