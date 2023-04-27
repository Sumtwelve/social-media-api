const { Types } = require('mongoose');
const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const {
    getRandomNames,
    getRandomEmail,
    getRandomThoughts,
    getObjectIds
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
    //const thoughts = [];

    // Create 10 example Users, each with 3 Thoughts and 2 friends
    // HOW THIS WORKS:
    // We cannot 
    for (let u = 0; u < 10; u++) {
        // create User
        let newUser = {
            username: getRandomNames(1),
            email: getRandomEmail(),
            thoughts: getObjectIds(3),
            friends: getObjectIds(2)
        };

        // Build our users array
        users.push(newUser);

        // Create 3 Thoughts, populate with 2 random Reactions
        

        // // Seed 5 friends
        // for (let f = 0; f < 5; f++) {
        //     let newFriend = {
        //         username: getRandomName(),
        //         email: getRandomEmail(),
        //         thoughts: [],
        //         friends: []
        //     };
        //     // Place new friend into User
        //     newUser.friends.push(newFriend);
        // }

    }

    // 

    const thoughts = {
        _id: getObjectIds(1),
        thoughtText: "if anyone finds my keys can you pls tell me? thanks",
        username: getRandomNames(1),
        reactions: [
            {
                reactionText: "wow",
                username: getRandomNames(1)
            },
            {
                reactionText: "this is not real",
                username: getRandomNames(1)
            },
            {
                reactionText: "this is a reaction",
                username: getRandomNames(1)
            }
        ]
    };

    await User.collection.insertMany(users);

    console.table(users);
    console.info("Seeding complete!")
    process.exit(0);
});