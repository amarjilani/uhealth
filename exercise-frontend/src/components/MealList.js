import React from 'react';
import Meal from './Meal';
import Table from 'react-bootstrap/Table';

function MealList({ meals, onDelete, onEdit }) {
    return (
        <Table bordered id="meals">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Calories</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {meals.map((meal, i) => 
                    <Meal 
                        meal={meal} 
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit} 
                    />)}
            </tbody>
        </Table>
    );
}

export default MealList;
