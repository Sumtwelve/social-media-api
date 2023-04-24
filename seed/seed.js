const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const {
    getRandomName,
    getRandomEmail,
    getRandomThoughts,
    getRandomReactions
} = require('./data');

connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
    console.log("Connected to database");

    // Delete existing Users
    await User.deleteMany({});

    // Delete existing Thoughts
    await Thought.deleteMany({});

    // An array to hold the Users we will be seeding
    const users = [];



    // Create 10 example users
    for (let i = 0; i < 10; i++) {
        // create User
        users.push({
            username: getRandomName,
            email: getRandomEmail
        })
        // create Reactions (2 per Thought)
        const reactions = getRandomReactions(2);
        // create Thoughts, add Reactions to them
    }
})