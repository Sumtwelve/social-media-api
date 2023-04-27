const { Types } = require('mongoose');
const { User, Thought } = require('../models');

module.exports = {
    // api/users/
    // GET all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            if (!users) {
                return res.status(404).json({ message: "No users found in the database :(" });
            }
            console.log(`Retrieved data for all users.`);
            return res.status(200).json(users);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    // api/users/:userId
    // GET a single user
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: "No user found with that ID" });
            }
            console.log(`Retrieved data for user ${user._id}`)
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    // api/users/:userId/thoughts
    // GET all Thoughts for one User
    async getUserThoughts(req, res) {
        try {
            // The route to get here was designed to make sense, not to be convenient.
            // Because we only have the User's _id, we have to do 2 queries.
            // The Thought model doesn't have a userId field, but it does have
            // a `username` field, so we find the User by the given _id,
            // then extract its `username` value and find all Thoughts
            // that have that username.
            const user = await User.findOne({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: "No user found with that ID" });
            }
            const thoughts = await Thought.find({ username: user.username });
            if (!thoughts) {
                return res.status(404).json({ message: "No thoughts found for this user." });
            }
            console.log(`Retrieved thoughts for user ${user._id}`);
            return res.status(200).json(thoughts);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    // api/users/
    // POST route to create new User
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            console.log(`Created user ${user._id}`);
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },
    
    // api/users/:userId
    // PUT route to update existing User
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "No user found with that ID" });
            }
            console.log(`Updated user ${user._id}`);
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    // api/users/:userId
    // DELETE a user and all thoughts associated with them
    async deleteUser(req, res) {
        try {
            // Delete the User
            const user = await User.findOneAndRemove({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: "No user found with that ID" });
            }

            // Now delete the Thoughts
            const thoughts = await Thought.deleteMany({ _id: { $in: user.thoughts } });
            if (!thoughts) {
                return res.status(404).json({ message: "User deleted, but no thoughts found to delete." });
            }
            console.log(`Deleted user ${user._id} and their thoughts:`, thoughts);
            return res.status(200).json(user);

        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    // api/users/:userId/friends/:friendId
    // POST route to add a user to a user's friend list
    async addFriend(req, res) {
        try {
            // make sure friendId matches an existing User
            const friend = await User.findById(req.params.friendId);
            if (!friend) {
                return res.status(404).json({ message: "No user found with the given friendId" });
            }
            // find and update the User's `friends` field
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: { _id: req.params.friendId } } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "No user found with the given userId" });
            }
            console.log(`Added friend ${req.params.friendId} to user ${user._id}'s friend list.`);
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    // api/users/:userId/friends/:friendId
    // DELETE route to remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            // make sure friendId matches an existing User
            const friend = await User.findById(req.params.friendId);
            if (!friend) {
                return res.status(404).json({ message: "No user found with the given friendId" });
            }
            // Find and update the user
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "No user found with that ID" });
            }
            console.log(`Removed ${req.params.friendId} from user ${user._id}'s friend list.`);
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    }
}