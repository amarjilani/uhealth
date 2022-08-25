// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB Exercises collection using Mongoose.');
    }
});


// SCHEMA: Define the meal schema.
const mealSchema = mongoose.Schema({
	name: { type: String, required: true },
	calories: { type: Number, required: true },
    date: { type: Date, required: true }
});

// Compile the model from the schema.
const Meal = mongoose.model("Meal", mealSchema);


// CREATE model *****************************************
const createMeal = async (name, calories, date) => {
    const meal = new Meal({ 
        name: name, 
        calories: calories,
        date: date 
    });
    return meal.save();
}


// RETRIEVE models *****************************************
// Retrieve based on a filter and return a promise.
const findMeals = async (filter) => {
    const query = Meal.find(filter);
    return query.exec();
}

// Retrieve based on the ID and return a promise.
const findMealById = async (_id) => {
    const query = Meal.findById(_id);
    return query.exec();
}


// DELETE model based on ID  *****************************************
const deleteMealById = async (_id) => {
    const result = await Meal.deleteOne({_id: _id});
    return result.deletedCount;
};


// REPLACE model *****************************************************
const replaceMeal = async (_id, name, calories, date) => {
    const result = await Meal.replaceOne({_id: _id }, {
        name: name,
        calories: calories,
        date: date
    });
    return result.modifiedCount;
}


// Export our variables for use in the controller file.
export { createMeal, findMeals, findMealById, replaceMeal, deleteMealById }