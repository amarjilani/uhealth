import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditMealPage = ({ meal }) => {
 
    const [name, setName] = useState(meal.name);
    const [calories, setCalories] = useState(meal.calories);
    const [date, setDate] = useState(meal.date.slice(0, 10));
    
    const history = useHistory();

    const editMeal = async () => {
        const response = await fetch(`/meals/${meal._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name,
                calories: calories, 
                date: date
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("Successfully edited document!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to update document. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    }

    return (
        <>
        <article>
            <h2>Edit your meal</h2>
            <p>Change up one of your meals!</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                <label for="name">Meal</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name"
                        required/>
                    
                    <label for="reps">Calories</label>
                    <input
                        type="number"
                        value={calories}
                        onChange={e => setCalories(e.target.value)} 
                        id="calories"
                        required />

                    <label for="date">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)} 
                        id="date"
                        required={true} />

                    <label for="submit">
                    <button
                        onClick={editMeal}
                        id="submit"
                    >Save</button></label>
                </fieldset>
                </form>
            </article>
        </>
    );
}
export default EditMealPage;