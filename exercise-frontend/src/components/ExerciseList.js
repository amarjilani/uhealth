import React from 'react';
import Exercise from './Exercise';
import Table from 'react-bootstrap/Table';

function ExerciseList({ exercises, onDelete, onEdit }) {
    return (
        <Table bordered id="exercises">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => 
                    <Exercise 
                        exercise={exercise} 
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit} 
                    />)}
            </tbody>
        </Table>
    );
}

export default ExerciseList;
