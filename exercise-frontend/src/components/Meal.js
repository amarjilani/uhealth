import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Meal({ meal, onEdit, onDelete }) {
    return (
        <tr>
            <td>{meal.name}</td>
            <td>{meal.calories}</td>
            <td>{meal.date.slice(0, 10)}</td>
            <td class="editButton"><MdEdit onClick={() => onEdit(meal)} /></td>
            <td class="deleteButton"><MdDeleteForever onClick={() => onDelete(meal._id)} /></td>
        </tr>
    );
}

export default Meal;