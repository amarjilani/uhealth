import 'dotenv/config';
import e from 'express';
import express from 'express';
import * as exercise from './exercise-model.mjs';
import * as meal from './meal-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());


// VALIDATE THE REQUEST 
const validRequest = (req) => {
    let valid = true
    if (Object.keys(req.body).length < 5){
        valid = false 
        return valid 
    }
    if (req.body.name === null || req.body.name.length === 0){
        valid = false
    }
    if (req.body.reps === null || req.body.reps.length === 0 || req.body.reps <= 0) {
        valid = false 
    }
    if (req.body.weight === null || req.body.weight.length === 0 || req.body.weight <= 0) {
        valid = false 
    }
    if (req.body.unit != "kgs" && req.body.unit != "lbs" && req.body.unit != "miles" && req.body.unit != "km"){
        valid = false 
    }
    return valid
}



// CREATE controller ******************************************
app.post ('/exercises', (req,res) => { 
    if (validRequest(req)){
    exercise.createExercise(
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date
        )
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Creation of a document failed due to invalid syntax.' });
        })} else{
            res.status(400).json({ error: 'Creation of a document failed due to invalid syntax.' });
        }
});


// RETRIEVE controller ****************************************************
// GET exercise by ID
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercise.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request to retrieve document failed' });
        });

});


// GET all exercises 
app.get('/exercises', (req, res) => {
    exercise.findExercises({}, '', 0)
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request to retrieve documents failed' });
        });

});

// DELETE Controller ******************************
app.delete('/exercises/:_id', (req, res) => {
    exercise.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed' });
        });
});


// UPDATE controller ************************************
app.put('/exercises/:_id', (req, res) => {
    // check if the update req body is valid, i.e. correct types and has all params
    if (validRequest(req)) {
        exercise.replaceExercise(
            req.params._id, 
            req.body.name, 
            req.body.reps, 
            req.body.weight,
            req.body.unit,
            req.body.date
        )

        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ 
                    _id: req.params._id, 
                    name: req.body.name, 
                    reps: req.body.reps, 
                    weight: req.body.weight,
                    unit: req.body.unit,
                    date: req.body.date
                })
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request to update a document failed' });

    })} else {
            res.status(400).json({ Error: 'Missing or invalid parameter(s)' });
        };

});

// VALIDATE THE REQUEST 
const validMealRequest = (req) => {
    let valid = true
    if (Object.keys(req.body).length < 3){
        valid = false 
        return valid 
    }
    if (req.body.name === null || req.body.name.length === 0){
        valid = false
    }
    if (req.body.calories === null || req.body.calories.length === 0 || req.body.calories <= 0) {
        valid = false 
    }

    return valid
}

// CREATE controller ******************************************
app.post ('/meals', (req,res) => { 
    if (validMealRequest(req)){
    meal.createMeal(
        req.body.name, 
        req.body.calories, 
        req.body.date
        )
        .then(meal => {
            res.status(201).json(meal);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Creation of a document failed due to invalid syntax.' });
        })} else{
            res.status(400).json({ error: 'Creation of a document failed due to invalid syntax.' });
        }
});


// RETRIEVE controller ****************************************************
// GET exercise by ID
app.get('/meals/:_id', (req, res) => {
    const mealId = req.params._id;
    meal.findMealById(mealId)
        .then(meal => { 
            if (meal !== null) {
                res.json(meal);
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request to retrieve document failed' });
        });

});


// GET all exercises 
app.get('/meals', (req, res) => {
    meal.findMeals({}, '', 0)
        .then(meals => {
            res.send(meals);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request to retrieve documents failed' });
        });

});

// DELETE Controller ******************************
app.delete('/meals/:_id', (req, res) => {
    meal.deleteMealById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed' });
        });
});


// UPDATE controller ************************************
app.put('/meals/:_id', (req, res) => {
    // check if the update req body is valid, i.e. correct types and has all params
    if (validMealRequest(req)) {
        meal.replaceMeal(
            req.params._id, 
            req.body.name, 
            req.body.calories,
            req.body.date
        )

        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ 
                    _id: req.params._id, 
                    name: req.body.name, 
                    reps: req.body.calories,
                    date: req.body.date
                })
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request to update a document failed' });

    })} else {
            res.status(400).json({ Error: 'Missing or invalid parameter(s)' });
        };

});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});