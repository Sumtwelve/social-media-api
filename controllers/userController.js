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
            const thoughts = await Thought.find({ userId: req.params.userId });
            if (!thoughts) {
                return res.status(404).json({ message: "No thoughts found for this user" });
            }
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

            return res.status(200).json(user);

        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    // api/users/:userId/friends/:friendId
    // POST to add a user to a user's friend list
    async addFriend(req, res) {
        try {
            // find and update the User's `friends` field
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: { _id: req.params.friendId } } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "No user found with that ID" });
            }
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    // api/users/:userId/friends/:friendId
    // DELETE to remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            // Find the user
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { _id: req.params.friendId } } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "No user found with that ID" });
            }
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    }
}