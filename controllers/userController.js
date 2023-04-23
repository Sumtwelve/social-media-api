//TODO: Bonus: remove a user's associated thoughts when deleted

const { User, Thought } = require('../models');

module.exports = {
    // /api/users/
    // GET all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            if (!users) {
                return res.status(404).json({ message: "No users found in the database :(" });
            }

            return res.status(200).json(users);

        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // /api/users/:userId
    // GET a single user
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: "No user with that ID found" });
            }

            return res.status(200).json(user);

        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // /api/users/
    // POST new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // /api/users/:userId
    // PUT to update existing user
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
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // /api/users/:userId
    // DELETE a user and all thoughts associated with them
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: "No user found with that ID" });
            }

            const thoughts = await Thought
                .find({ userId: req.params.userId })
                .remove((err) => err
                                 ? console.error(err)
                                 : console.log("Thoughts removed"));

            if (!thoughts) {
                return res.status(404).json({ message: "User deleted, but no thoughts found to delete." });
            }

            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // /api/users/:userId/friends/:friendId
    // POST to add a user to a user's friend list
    async addFriend(req, res) {
        try {
            // find and update the user
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: { _id: req.params.friendId } } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "No user found with that ID" });
            }

            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // /api/users/:userId/friends/:friendId
    // DELETE to remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            // Find the friend
            // FIXME: This implementation is slightly different from the above route.
            // Here we find the friend separately, and then pass it directly into
            // the update function. This isn't how I learned to do this sort of thing,
            // but I want to test it and see if it works.
            // If it does work, I would almost prefer this method, since it lets us
            // return a separate error message if the friendId wasn't found
            const friend = await User.findOne({ _id: req.params.friendId });
            if (!friend) {
                return res.status(404).json({ message: "Invalid Friend ID" });
            }

            // find the user
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: friend } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "No user found with that ID" });
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}