const { User, Thought } = require('../models');

module.exports = {
    // api/thoughts/
    // GET all Thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            if (!thoughts) {
                return res.status(404).json({ message: "No thought in the database :(" });
            }
            console.log("Retrieved data for all thoughts.");
            return res.status(200).json(thoughts);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    // api/thoughts/:thoughtId
    // GET one Thought by its _id
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: "No thought found with that ID" });
            }
            console.log(`Retrieved data for thought ${thought._id}`);
            return res.status(200).json(thought);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    // api/thoughts/
    // POST route to create new Thought and push it to associated User
    async addThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: newThought } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "No user found with that ID" });
            }
            console.log(`Created new thought ${newThought._id} for user ${user._id}`);
            return res.status(200).json(newThought);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    // api/thoughts/:thoughtId
    // PUT route to update a Thought by its _id
    async updateThought(req, res) {
        try {
            if (!req.body.thoughtText) {
                return res.status(400).json({ message: "This route is for changing the thoughtText only." })
            }
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: { thoughtText: req.body.thoughtText } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: "No thought found with that ID" });
            }
            console.log(`Updated thought ${thought._id}`);
            return res.status(200).json(thought);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    // api/thoughts/:thoughtId
    // DELETE a Thought by its _id
    async deleteThought(req, res) {
        try {
            // Delete the thought, but make sure we can access `username` field of deleted thought.
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: "No thought found with that ID" });
            }
            // Pull the thought from its associated User
            const user = await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "Thought deleted, but user that created it does not exist." })
            }
            console.log(`Deleted thought ${thought._id}`);
            return res.status(200).json(thought);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    // api/thoughts/:thoughtId/reactions
    // POST route to push a new Reaction to an existing Thought
    async addReaction(req, res) {
        try {
            // We need `username` to make some queries, so make sure request body has it.
            if (!req.body.username) {
                return res.status(400).json({ message: "Error: Required field 'username' is missing or empty" })
            }
            // make sure `username` field matches an existing User
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json({ message: "No user found with the given username" });
            }
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: "No thought found with that ID" });
            }
            console.log(`Added reaction to thought ${thought._id}`);
            return res.status(200).json(thought);
        } catch (err) {
            console.error(err);
            if (err.name === "CastError") {
                // If we're here, that most likely means an invalid thoughtId was passed
                // into req.params. Mongoose was unable to cast it as an ObjectId, thus
                // the name "CastError".
                return res.status(400).json({ message: "Error: Invalid thoughtId" });
            } else {
                return res.status(500).json(err);
            }
        }
    },

    // api/thoughts/:thoughtId/reactions/:reactionId
    // DELETE a Reaction from a Thought
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: "No thought found with that ID" });
            }
            console.log(`Deleted reaction ${req.params.reactionId}`);
            return res.status(200).json(thought);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    }
}