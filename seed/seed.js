const { Types } = require('mongoose');
const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
    console.log("Connected to database");
    
    // Delete all existing Users
    await User.deleteMany({});

    // Delete all existing Thoughts
    await Thought.deleteMany({});

    // We create the thoughts first so we can insert their ObjectIds when creating the users
    const thoughts = [
        {
            _id: new Types.ObjectId(),
            thoughtText: "User1's first thought!",
            createdAt: Date.now(),
            username: 'user1',
            reactions: [
                {
                    reactionText: "User2's reaction",
                    createdAt: Date.now(),
                    username: 'user2'
                },
                {
                    reactionText: "User3's reaction",
                    createdAt: Date.now(),
                    username: 'user3'
                }
            ]
        },
        {
            _id: new Types.ObjectId(),
            thoughtText: "User2's first thought!",
            createdAt: Date.now(),
            username: 'user2',
            reactions: [
                {
                    reactionText: "User1's reaction",
                    createdAt: Date.now(),
                    username: 'user1'
                },
                {
                    reactionText: "User3's reaction",
                    createdAt: Date.now(),
                    username: 'user3'
                }
            ]
        },
        {
            _id: new Types.ObjectId(),
            thoughtText: "User3's first thought!",
            createdAt: Date.now(),
            username: 'user3',
            reactions: [
                {
                    reactionText: "User1's reaction",
                    createdAt: Date.now(),
                    username: 'user1'
                },
                {
                    reactionText: "User2's reaction",
                    createdAt: Date.now(),
                    username: 'user2'
                }
            ]
        }
    ];

    await Thought.collection.insertMany(thoughts);

    const userIds = [
        new Types.ObjectId(),
        new Types.ObjectId(),
        new Types.ObjectId()
    ]

    const users = [
        {
            _id: userIds[0],
            username: "user1",
            email: 'user1@gmail.com',
            thoughts: [thoughts[0]._id],
            friends: [userIds[1], userIds[2]]
        },
        {
            _id: userIds[1],
            username: "user2",
            email: 'user2@gmail.com',
            thoughts: [thoughts[1]._id],
            friends: [userIds[0], userIds[2]]
        },
        {
            _id: userIds[2],
            username: "user3",
            email: 'user3@gmail.com',
            thoughts: [thoughts[2]._id],
            friends: [userIds[0], userIds[1]]
        },
    ];

    await User.collection.insertMany(users);

    console.table(users);
    console.info("Seeding complete!")
    process.exit(0);
});