const { Types } = require('mongoose');
const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
    console.log("Connected to database");
    
    // Delete existing Users
    await User.deleteMany({});

    // Delete existing Thoughts
    await Thought.deleteMany({});

    const thoughts = [
        {
            _id: new Types.ObjectId(),
            thoughtText: "User1's first thought!",
            username: 'user1',
            reactions: [
                {
                    reactionText: "User2's reaction",
                    username: 'user2'
                },
                {
                    reactionText: "User3's reaction",
                    username: 'user3'
                }
            ]
        },
        {
            _id: new Types.ObjectId(),
            thoughtText: "User2's first thought!",
            username: 'user2',
            reactions: [
                {
                    reactionText: "User1's reaction",
                    username: 'user1'
                },
                {
                    reactionText: "User3's reaction",
                    username: 'user3'
                }
            ]
        },
        {
            _id: new Types.ObjectId(),
            thoughtText: "User3's first thought!",
            username: 'user3',
            reactions: [
                {
                    reactionText: "User1's reaction",
                    username: 'user1'
                },
                {
                    reactionText: "User2's reaction",
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
            _id: userIds[3],
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